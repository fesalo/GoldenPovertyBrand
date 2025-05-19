<?php

namespace App\Controller;

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api/category', name: 'app_category')]
final class CategoryController extends AbstractController
{
    #[Route('', name: 'category_index', methods: ['GET'])]
    public function index(EntityManagerInterface $em): JsonResponse
    {
        $categories = $em->getRepository(Category::class)->findAll();

        $data = array_map(function (Category $category) {
            return [
                'id' => $category->getId(),
                'name' => $category->getName(),
            ];
        }, $categories);

        return new JsonResponse($data);
    }

    #[Route('', name: 'category_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $name = $data['name'] ?? null;

        if (!$name) {
            return new JsonResponse(['error' => 'El nombre es obligatorio'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $category = new Category();
        $category->setName($name);

        $em->persist($category);
        $em->flush();

        return new JsonResponse(['status' => 'Categoría creada', 'id' => $category->getId()], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'category_show', methods: ['GET'])]
    public function show(int $id, EntityManagerInterface $em): JsonResponse
    {
        $category = $em->getRepository(Category::class)->find($id);

        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], JsonResponse::HTTP_NOT_FOUND);
        }

        return new JsonResponse([
            'id' => $category->getId(),
            'name' => $category->getName(),
        ]);
    }

    #[Route('/{id}', name: 'category_update', methods: ['PUT', 'PATCH'])]
    public function update(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $category = $em->getRepository(Category::class)->find($id);

        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], JsonResponse::HTTP_NOT_FOUND);
        }

        $data = json_decode($request->getContent(), true);
        $name = $data['name'] ?? null;

        if ($name) {
            $category->setName($name);
        }

        $em->flush();

        return new JsonResponse(['status' => 'Categoría actualizada']);
    }

    #[Route('/{id}', name: 'category_delete', methods: ['DELETE'])]
    public function delete(int $id, EntityManagerInterface $em): JsonResponse
    {
        $category = $em->getRepository(Category::class)->find($id);

        if (!$category) {
            return new JsonResponse(['error' => 'Categoría no encontrada'], JsonResponse::HTTP_NOT_FOUND);
        }

        $em->remove($category);
        $em->flush();

        return new JsonResponse(['status' => 'Categoría eliminada']);
    }
}
