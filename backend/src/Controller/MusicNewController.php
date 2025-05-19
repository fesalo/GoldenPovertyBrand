<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class MusicNewController extends AbstractController
{
    #[Route('/music/new', name: 'app_music_new')]
    public function index(): Response
    {
        return $this->render('music_new/index.html.twig', [
            'controller_name' => 'MusicNewController',
        ]);
    }
}
