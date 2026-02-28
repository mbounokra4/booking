<?php

namespace App\Controller\Api\Admin;

use App\Entity\User;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/admin/users')]
class AdminUserController extends AbstractController
{
    // GET ALL USERS (Admin only)
    #[Route('', name: 'api_admin_users', methods: ['GET'])]
    public function list(UserRepository $repo): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        return $this->json(
            $repo->findAll(),
            200,
            [],
            ["groups" => ["user:read"]]
        );
    }

    // DELETE USER (Admin only)
    #[Route('/{id}', name: 'api_admin_users_delete', methods: ['DELETE'])]
    public function delete(User $user, EntityManagerInterface $em): JsonResponse
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em->remove($user);
        $em->flush();

        return new JsonResponse(null, 204);
    }
}
