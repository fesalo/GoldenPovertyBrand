<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/user')]
class UserController extends AbstractController
{
    #[Route('', name: 'user_index', methods: ['GET'])]
    public function index(UserRepository $userRepository): JsonResponse
    {
        $users = $userRepository->findAll();

        $data = array_map(function (User $user) {
            return [
                'id' => $user->getId(),
                'userName' => $user->getUserName(),
                'email' => $user->getEmail(),
                'password' => $user->getPassword(),  // Devuelvo contraseña sin encriptar
                'isAdmin' => $user->isAdmin(),
            ];
        }, $users);

        return new JsonResponse($data);
    }

    #[Route('', name: 'user_create', methods: ['POST'])]
    public function create(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $user = new User();
        $user->setUserName($data['userName'] ?? '');
        $user->setEmail($data['email'] ?? '');
        $user->setIsAdmin($data['isAdmin'] ?? false);

        // Guardar la contraseña tal cual (sin hash)
        $user->setPassword($data['password'] ?? '');

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['status' => 'Usuario creado'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'user_show', methods: ['GET'])]
    public function show(User $user): JsonResponse
    {
        return new JsonResponse([
            'id' => $user->getId(),
            'userName' => $user->getUserName(),
            'email' => $user->getEmail(),
            'password' => $user->getPassword(),  // Devuelvo contraseña sin encriptar
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    #[Route('/{id}', name: 'user_update', methods: ['PUT'])]
    public function update(Request $request, User $user, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['userName'])) $user->setUserName($data['userName']);
        if (isset($data['email'])) $user->setEmail($data['email']);
        if (isset($data['isAdmin'])) $user->setIsAdmin($data['isAdmin']);
        if (isset($data['password'])) {
            // Actualizo la contraseña sin hash
            $user->setPassword($data['password']);
        }

        $em->flush();

        return new JsonResponse(['status' => 'Usuario actualizado']);
    }

    #[Route('/{id}', name: 'user_delete', methods: ['DELETE'])]
    public function delete(User $user, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($user);
        $em->flush();

        return new JsonResponse(['status' => 'Usuario eliminado']);
    }
}
