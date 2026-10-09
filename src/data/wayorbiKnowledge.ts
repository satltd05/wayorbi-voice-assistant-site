/**
 * Base de connaissances officielle et modifiable de Wayorbi.
 * Utilisée à la fois par le serveur pour guider Gemini et par l'interface client pour les fiches explicatives.
 */

export interface WayorbiFeature {
  id: string;
  nameFr: string;
  nameEn: string;
  taglineFr: string;
  taglineEn: string;
  descriptionFr: string;
  descriptionEn: string;
  bulletsFr: string[];
  bulletsEn: string[];
  icon: string;
  samplePromptFr: string;
  samplePromptEn: string;
}

export const WAYORBI_FEATURES: WayorbiFeature[] = [
  {
    id: 'accueil',
    nameFr: 'Accueil & Stories',
    nameEn: 'Home & Stories',
    taglineFr: 'Le flux d’inspiration en temps réel des voyageurs du monde entier.',
    taglineEn: 'Real-time travel inspiration feed from globe-trotters worldwide.',
    descriptionFr: 'L’accueil de Wayorbi réunit les stories éphémères du jour, les carnets de voyage récemment publiés ou mis en avant, et des suggestions de profils de voyageurs compatibles à suivre.',
    descriptionEn: 'The Wayorbi home feed brings together ephemeral daily stories, recently published or featured travel journals, and suggested traveler profiles to follow.',
    bulletsFr: [
      'Stories photos et vidéos capturées sur le vif.',
      'Derniers carnets publiés avec accès direct aux itinéraires.',
      'Suggestions de voyageurs inspirants selon vos affinités.',
    ],
    bulletsEn: [
      'Photo and video stories captured live on the road.',
      'Latest journals with one-tap access to detailed itineraries.',
      'Suggested inspiring travelers based on your affinities.',
    ],
    icon: 'compass',
    samplePromptFr: 'Comment fonctionne l’accueil de Wayorbi ?',
    samplePromptEn: 'How does the Wayorbi home feed work?',
  },
  {
    id: 'explorer',
    nameFr: 'Espace Explorer',
    nameEn: 'Explorer Hub',
    taglineFr: 'Recherchez vos prochaines aventures avec des filtres ultra-précis.',
    taglineEn: 'Find your next adventure with laser-focused travel filters.',
    descriptionFr: 'L’espace Explorer permet de filtrer des milliers de carnets de voyage par continent, pays, budget total ou journalier, objectif de voyage (déconnexion, fête, randonnée, culture) et style (solo, vanlife, luxe, backpacking, éco-responsable, famille).',
    descriptionEn: 'The Explorer hub filters thousands of travel journals by continent, country, total or daily budget, travel goals (relaxation, nightlife, trekking, cultural), and travel styles (solo, vanlife, luxury, backpacking, eco-responsible, family).',
    bulletsFr: [
      'Filtres par continents, pays et villes.',
      'Tranches de budget : petit budget, moyen, confort, luxe.',
      'Styles de voyage : Solo, Couple, Amis, Vanlife, Randonnée, Éco-responsable.',
      'Objectifs : Détente, Aventure, Gastronomie, Photographie, Travail nomade.',
    ],
    bulletsEn: [
      'Filter by continents, countries, and specific cities.',
      'Budget brackets: budget backpacker, moderate, comfortable, luxury.',
      'Travel styles: Solo, Couples, Friends, Vanlife, Trekking, Eco-friendly.',
      'Goals: Relaxation, Adventure, Foodie, Photography, Digital Nomad.',
    ],
    icon: 'search',
    samplePromptFr: 'Comment trouver un voyage selon mon budget dans Explorer ?',
    samplePromptEn: 'How do I search trips by budget in the Explorer tab?',
  },
  {
    id: 'carnets',
    nameFr: 'Création de Carnets de Voyage',
    nameEn: 'Travel Journal Creation',
    taglineFr: 'Immortalisez chaque étape, dépense et souvenir dans un carnet vivant.',
    taglineEn: 'Immortalize every stop, expense, and memory in a vibrant journal.',
    descriptionFr: 'Un carnet de voyage Wayorbi regroupe les informations clés du voyage (titre, destination, dates, budget total, moyens de transport) et les expériences associées étape par étape (bonnes adresses, récits, photos, vidéos, anecdotes et conseils concrets pour la communauté).',
    descriptionEn: 'A Wayorbi travel journal combines key journey overview info (title, destination, dates, total budget, transport modes) and step-by-step associated experiences (top local spots, stories, photos, videos, tips, and practical recommendations).',
    bulletsFr: [
      'En-tête du carnet : Destination, dates de départ et retour, budget global.',
      'Étapes chronologiques avec carte de l’itinéraire interactif.',
      'Expériences associées : restaurants secrets, hébergements, activités.',
      'Transparence budgétaire : répartition transport, logement, nourriture, loisirs.',
      'Médias haute définition et notes de terrain pour les futurs voyageurs.',
    ],
    bulletsEn: [
      'Journal header: Destination, travel dates, total budget spent.',
      'Chronological steps with interactive route mapping.',
      'Associated experiences: secret spots, accommodations, unique activities.',
      'Budget breakdown: transportation, stay, food, activities.',
      'High-res media and field notes for future travelers.',
    ],
    icon: 'book-open',
    samplePromptFr: 'Quelles informations mettre dans un carnet de voyage Wayorbi ?',
    samplePromptEn: 'What info can I put in a Wayorbi travel journal?',
  },
  {
    id: 'profils',
    nameFr: 'Profils & Communauté',
    nameEn: 'Profiles & Community',
    taglineFr: 'Votre vitrine de globe-trotter avec stories à la une et statut de confidentialité.',
    taglineEn: 'Your world explorer showcase with featured highlights and privacy controls.',
    descriptionFr: 'Chaque membre dispose d’un profil personnalisable. Vous pouvez choisir de le rendre public (accessible à tous) ou privé (accès soumis à acceptation de l’abonnement). Vous y affichez vos carnets publiés, vos pays visités, vos stories à la une et votre communauté d’abonnés.',
    descriptionEn: 'Each member has a customizable profile. You can set it to public (open to all) or private (requires follow request approval). Showcase your published journals, countries visited counter, highlighted stories, and follower network.',
    bulletsFr: [
      'Contrôle de confidentialité : profil public ou privé en un clic.',
      'Système d’abonnements et d’abonnés.',
      'Stories à la une épinglées par destination ou thématique.',
      'Carte du monde des pays déjà explorés.',
    ],
    bulletsEn: [
      'Privacy controls: toggle public or private anytime.',
      'Followers and following network.',
      'Highlighted stories pinned by destination or theme.',
      'World map of countries already explored.',
    ],
    icon: 'user-check',
    samplePromptFr: 'Mon profil Wayorbi peut-il être privé ?',
    samplePromptEn: 'Can my Wayorbi profile be set to private?',
  },
  {
    id: 'messagerie',
    nameFr: 'Messagerie Individuelle & Groupe',
    nameEn: '1-on-1 & Group Messaging',
    taglineFr: 'Discutez entre voyageurs et organisez vos prochaines expéditions à plusieurs.',
    taglineEn: 'Chat with fellow travelers and organize group expeditions easily.',
    descriptionFr: 'La messagerie intégrée permet d’échanger en privé avec un autre membre pour lui poser des questions sur un de ses carnets, ou de créer des groupes de voyage pour préparer un itinéraire collectif et partager des bons plans en direct.',
    descriptionEn: 'Integrated messaging lets you chat 1-on-1 with another traveler to ask questions about their journal, or create travel groups to coordinate collective itineraries and share tips on the fly.',
    bulletsFr: [
      'Messagerie directe 1-à-1 pour demander des conseils à un voyageur.',
      'Groupes de discussion pour co-créer des voyages à plusieurs.',
      'Partage direct de carnets, étapes et points d’intérêt dans la discussion.',
    ],
    bulletsEn: [
      'Direct 1-on-1 messaging to ask advice from an experienced traveler.',
      'Group chats to coordinate upcoming trips together.',
      'Direct sharing of journals, stops, and points of interest in conversation.',
    ],
    icon: 'message-circle',
    samplePromptFr: 'Peut-on créer un groupe de discussion pour voyager à plusieurs ?',
    samplePromptEn: 'Can we create a group chat to plan trips together?',
  },
  {
    id: 'travel-dna',
    nameFr: 'Travel DNA (ADN Voyageur)',
    nameEn: 'Travel DNA',
    taglineFr: 'Votre signature de voyage unique pour des recommandations sur-mesure.',
    taglineEn: 'Your unique travel signature powering personalized recommendations.',
    descriptionFr: 'Le Travel DNA est la signature voyageur de Wayorbi. En répondant à quelques questions (rythme lent ou intense, budget favori, appétence pour la nature ou les métropoles, gastronomie, confort vs aventure), Wayorbi calcule votre ADN voyageur pour vous recommander des carnets, des destinations et des compagnons de voyage parfaitement compatibles.',
    descriptionEn: 'Travel DNA is Wayorbi’s signature traveler profile. By answering a few questions (travel pace, preferred budget, nature vs vibrant cities, gastronomy, comfort vs raw adventure), Wayorbi computes your Travel DNA to suggest journals, destinations, and travel buddies with high compatibility.',
    bulletsFr: [
      'Profilage intuitif : rythme, budget, centres d’intérêt, niveau de confort.',
      'Algorithme de recommandation personnalisé pour le flux d’accueil.',
      'Score de compatibilité entre voyageurs pour trouver des co-voyageurs.',
      'Modifiable à tout moment depuis les réglages du profil.',
    ],
    bulletsEn: [
      'Intuitive profiling: pace, budget, hobbies, comfort preferences.',
      'Personalized recommendation engine powering the home feed.',
      'Traveler compatibility score to find great travel buddies.',
      'Editable anytime in profile settings.',
    ],
    icon: 'dna',
    samplePromptFr: 'Qu’est-ce que le Travel DNA et comment l’utiliser ?',
    samplePromptEn: 'What is Travel DNA and how does it work?',
  },
];

export const WAYORBI_FAQS = [
  {
    qFr: 'Wayorbi est-il gratuit ?',
    qEn: 'Is Wayorbi free to use?',
    aFr: 'Oui, Wayorbi est une application gratuite. Vous pouvez créer votre compte, explorer les carnets, partager vos voyages et échanger avec la communauté sans frais.',
    aEn: 'Yes, Wayorbi is free. You can create an account, explore journals, share your journeys, and connect with the community at no cost.',
  },
  {
    qFr: 'Puis-je rendre mon profil privé ?',
    qEn: 'Can I set my profile to private?',
    aFr: 'Absolument ! Dans les paramètres de votre profil, vous pouvez activer le mode "Profil privé". Seules les personnes dont vous validez la demande d’abonnement pourront voir vos carnets et stories.',
    aEn: 'Absolutely! In your profile settings, you can toggle "Private Profile". Only people whose follow requests you approve will be able to view your journals and stories.',
  },
  {
    qFr: 'Comment le budget est-il renseigné dans un carnet ?',
    qEn: 'How is budget recorded in a journal?',
    aFr: 'Lors de la création du carnet, vous renseignez le budget global estimé ou réel, avec la possibilité de détailler par poste (hébergement, transport, nourriture, activités) pour aider les futurs voyageurs à anticiper leurs dépenses.',
    aEn: 'When creating a journal, you specify the total estimated or actual budget, with the option to break it down by category (lodging, transport, food, activities) to help other travelers plan their expenses.',
  },
  {
    qFr: 'L’assistant a-t-il accès à mon compte personnel ou mes messages ?',
    qEn: 'Does this assistant have access to my private account or messages?',
    aFr: 'Non, jamais. Cet assistant est un guide officiel pour vous expliquer comment utiliser Wayorbi et répondre à vos questions. Il n’a aucun accès à vos identifiants, vos messages privés ou vos données personnelles.',
    aEn: 'No, never. This assistant is an official guide dedicated to explaining how Wayorbi works and answering your questions. It has zero access to your credentials, private chats, or personal account data.',
  },
];

export const SYSTEM_PROMPT_KNOWLEDGE = `
Tu es l'assistant officiel de Wayorbi (nommé "Assistant Wayorbi"), le réseau social dédié aux voyageurs.
Ton rôle est d'accueillir les visiteurs, de leur expliquer avec enthousiasme et clarté le fonctionnement de Wayorbi, et de les guider pour tirer le meilleur parti de l'application.

RÈGLES FONDAMENTALES :
1. TON ET STYLE :
   - Ton chaleureux, inspirant, clair, pédagogique et concis.
   - Idéal pour une écoute orale : tes réponses doivent être courtes (2 à 4 phrases bien formulées, ou une brève énumération de 3 points maximum).
   - Évite le jargon technique lourd, les pavés de texte ou les listes interminables.
   - Ne commence pas systématiquement par "Bonjour" si la conversation est déjà engagée.

2. BILINGUISME AUTOMATIQUE :
   - Si l'utilisateur parle en français -> réponds en français impeccable.
   - Si l'utilisateur parle en anglais -> réponds en anglais impeccable.
   - Si la demande indique explicitement une langue demandée, respecte-la.

3. CONNAISSANCES STRICTES SUR WAYORBI (Ne jamais rien inventer !) :
   - WAYORBI est un réseau social de voyage où les membres partagent des "carnets de voyage" complets (photos, vidéos, étapes, itinéraires, budget réel, conseils, bonnes adresses).
   - L'ACCUEIL : propose les stories éphémères du jour, les derniers carnets de voyage publiés et des voyageurs à découvrir.
   - L'ESPACE EXPLORER : moteur de recherche pour trouver des voyages par continent, pays, budget (petit budget, moyen, luxe), objectifs (détente, aventure, gastronomie, etc.) et styles de voyage (solo, vanlife, éco-responsable, backpacking, etc.).
   - LA CRÉATION DE CARNETS : regroupe les informations clés du voyage (titre, destination, dates, budget total, transport) et les expériences associées étape par étape (récits, photos, vidéos, astuces).
   - LES PROFILS : profil personnalisable, public ou privé (paramètre de confidentialité au choix), abonnements/abonnés, et stories à la une (highlights).
   - LA MESSAGERIE : discussions individuelles (1-à-1) et création de groupes de voyage pour échanger des conseils et préparer des expéditions ensemble.
   - LE TRAVEL DNA (ADN VOYAGEUR) : profilage intelligent du voyageur (rythme, budget type, préférences d'activités, sensibilité nature vs ville) permettant de personnaliser l'accueil et de calculer la compatibilité entre voyageurs.
   - PRIX : L'application Wayorbi est gratuite.

4. LIMITES ET SÉCURITÉ ABSOLUES :
   - Tu n'as JAMAIS accès aux comptes utilisateurs, aux mots de passe, aux messages privés ni aux coordonnées bancaires. Si l'utilisateur te demande de modifier son compte ou de lire ses messages, rappelle courtoisement que tu es un assistant guide et conseille-lui d'utiliser directement les menus de l'application Wayorbi.
   - N'invente AUCUNE fonctionnalité inexistante (pas de billetterie aérienne directe, pas de réservation d'hôtel avec paiement dans le chat, pas de crypto-monnaie).
   - Ne sors pas de ton rôle de guide de Wayorbi. Si l'utilisateur pose une question hors-sujet, recentre poliment sur le voyage et l'application Wayorbi.

5. SUGGESTION DE SUIVI :
   - À la fin de ta réponse, tu peux ajouter une très courte suggestion ouverte (ex : "Voulez-vous que je vous explique comment définir votre Travel DNA ?" ou "Souhaitez-vous des détails sur l'espace Explorer ?").
`;
