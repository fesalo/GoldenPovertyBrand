<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Product;
use App\Entity\Category;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Response;

#[Route('/api/product', name: 'app_product')]
final class ProductController extends AbstractController
{
    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;
        $description = $data['description'] ?? null;
        $price = $data['price'] ?? null;
        $stock = $data['stock'] ?? null;
        $categoryId = $data['category'] ?? null;
        $imageBase64 = $data['frontImage'] ?? null;

        if (!$name || !$description || !$categoryId) {
            return new JsonResponse(['error' => 'Datos inválidos'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $category = $em->getRepository(Category::class)->find($categoryId);
        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], JsonResponse::HTTP_BAD_REQUEST);
        }


        $product = new Product();
        $product->setName($name);
        $product->setDescription($description);
        $product->setPrice($price);
        $product->setStock($stock);
        $product->setCategory($category);
        $product->setCreationDate(new \DateTime());

        if ($imageBase64) {
            $result = $this->handleImageUpload($imageBase64);
            if ($result['error']) {
                return new JsonResponse(['error' => $result['message']], $result['status']);
            }
            $product->setFrontImage($result['path']);
        }

        $em->persist($product);
        $em->flush();

        return new JsonResponse(['status' => 'Producto creado'], JsonResponse::HTTP_CREATED);
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(EntityManagerInterface $em): JsonResponse
    {
        $products = $em->getRepository(Product::class)->findAll();
        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'stock' => $product->getStock(),
                'category' => $product->getCategory() ? $product->getCategory()->getId() : null,
                'frontImage' => $product->getFrontImage(),
                'creationDate' => $product->getCreationDate() ? $product->getCreationDate()->format('Y-m-d') : null,
            ];
        }
        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        $data = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'description' => $product->getDescription(),
            'price' => $product->getPrice(),
            'stock' => $product->getStock(),
            'creationDate' => $product->getCreationDate()?->format('Y-m-d'),
            'category' => $product->getCategory() ? $product->getCategory()->getId() : null,
            'frontImage' => $product->getFrontImage()
        ];

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT'])]
    public function update(Request $request, Product $product, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }
        if (isset($data['stock'])) {
            $product->setStock($data['stock']);
        }
        if (isset($data['frontImage'])) {
            // Asumimos que frontImage es una cadena (ruta o URL)
            $product->setFrontImage($data['frontImage']);
        }

        if (isset($data['creationDate'])) {
            try {
                $creationDate = new \DateTime($data['creationDate']);
                $product->setCreationDate($creationDate);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Fecha inválida'], JsonResponse::HTTP_BAD_REQUEST);
            }
        }

        if (isset($data['category'])) {
            $category = $em->getRepository(Category::class)->find($data['category']);
            if (!$category) {
                return new JsonResponse(['error' => 'Categoría no encontrada'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $product->setCategory($category);
        }

        $em->flush();

        return new JsonResponse(['status' => 'Producto actualizado']);
    }

    #[Route('/{id}', name: 'partial_update', methods: ['PATCH'])]
    public function partialUpdate(Request $request, Product $product, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['name'])) {
            $product->setName($data['name']);
        }
        if (isset($data['description'])) {
            $product->setDescription($data['description']);
        }
        if (isset($data['price'])) {
            $product->setPrice($data['price']);
        }
        if (isset($data['stock'])) {
            $product->setStock($data['stock']);
        }
        if (isset($data['frontImage'])) {
            $result = $this->handleImageUpload($data['frontImage']);
            if ($result['error']) {
                return new JsonResponse(['error' => $result['message']], $result['status']);
            }
            $product->setFrontImage($result['path']);
        }
        if (isset($data['creationDate'])) {
            try {
                $creationDate = new \DateTime($data['creationDate']);
                $product->setCreationDate($creationDate);
            } catch (\Exception $e) {
                return new JsonResponse(['error' => 'Fecha inválida'], JsonResponse::HTTP_BAD_REQUEST);
            }
        }
        if (isset($data['category'])) {
            $category = $em->getRepository(Category::class)->find($data['category']);
            if (!$category) {
                return new JsonResponse(['error' => 'Categoría no encontrada'], JsonResponse::HTTP_BAD_REQUEST);
            }
            $product->setCategory($category);
        }

        $em->flush();

        return new JsonResponse(['status' => 'Producto actualizado']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'])]
    public function delete(Product $product, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($product);
        $em->flush();

        return new JsonResponse(['status' => 'Producto eliminado']);
    }


    private function handleImageUpload(string $imagenBase64): array
    {
        try {
            $imageData = base64_decode($imagenBase64);

            if ($imageData === false) {
                return ['error' => true, 'message' => 'Error al decodificar la imagen', 'status' => JsonResponse::HTTP_BAD_REQUEST];
            }

            $fileName = uniqid('producto_') . '.jpg';

            $uploadDir = $this->getParameter('kernel.project_dir') . '/public/uploads/productos/';
            if (!file_exists($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            file_put_contents($uploadDir . $fileName, $imageData);

            return ['error' => false, 'path' => '/uploads/productos/' . $fileName];
        } catch (\Exception $e) {
            return ['error' => true, 'message' => 'Error al guardar la imagen', 'status' => JsonResponse::HTTP_INTERNAL_SERVER_ERROR];
        }
    }


}
