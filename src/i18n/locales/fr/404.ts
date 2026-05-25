import type { NotFound } from '../en/404';

const notFound: NotFound = {
  meta: {
    title: 'Page introuvable',
    description: "La page que vous cherchez n'existe pas.",
  },
  heading: 'Page introuvable',
  body: "La page que vous cherchez n'existe pas ou a été déplacée.",
  cta: "Retour à l'accueil",
};

export default notFound;
