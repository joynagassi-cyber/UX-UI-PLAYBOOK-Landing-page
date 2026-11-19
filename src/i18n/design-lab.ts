import type { Locale } from './content';

export type DesignRole = 'product' | 'ux' | 'ui';
export type LabStage = 'service' | 'slot' | 'review';
interface Annotation { title: string; decision: string; check: string }
interface LabCopy {
  viewpoints: string; screens: string; roles: Record<DesignRole, string>; stages: Record<LabStage, string>;
  annotations: Record<LabStage, Record<DesignRole, Annotation>>;
  decision: string; check: string; reset: string; failure: string; failureReady: string;
  app: string; example: string; service: string; serviceDescription: string; inclusion: string;
  location: string; address: string; duration: string; price: string; payment: string;
  availability: string; date: string; chooseTime: string; selected: string; unavailable: string;
  review: string; back: string; continue: string; confirm: string; change: string;
  serviceLabel: string; timeLabel: string; total: string; noCard: string; missing: string;
  complete: string; noBooking: string; reference: string; rejection: string; retry: string;
}

export const DESIGN_LAB: Record<Locale, LabCopy> = {
  fr: {
    viewpoints: 'Choisir un regard', screens: 'Écrans du prototype',
    roles: { product: 'Product', ux: 'UX', ui: 'UI' }, stages: { service: 'L’offre', slot: 'Le créneau', review: 'Le récapitulatif' },
    decision: 'Décision à documenter', check: 'Essai à préparer', reset: 'Réinitialiser le prototype',
    failure: 'Simuler un créneau pris', failureReady: 'Incident armé : le prochain créneau choisi sera refusé.',
    app: 'Atelier', example: 'EXEMPLE FICTIF', service: 'Entretien vélo',
    serviceDescription: 'Freinage, transmission et pression des pneus.', inclusion: 'Pièces non comprises. Diagnostic avant tout supplément.',
    location: 'Atelier République', address: '12 rue des Ateliers · adresse fictive', duration: '45 min', price: '39 €', payment: 'Paiement à l’atelier',
    availability: 'Disponibilités illustratives', date: 'Mardi 24 novembre', chooseTime: 'Choisir un horaire', selected: 'Sélectionné', unavailable: 'Indisponible',
    review: 'Vérifier le rendez-vous', back: 'Revenir à l’écran précédent', continue: 'Choisir un créneau', confirm: 'Simuler la confirmation', change: 'Modifier le créneau',
    serviceLabel: 'Prestation', timeLabel: 'Horaire', total: 'Total prévu', noCard: 'Aucune carte bancaire demandée dans ce prototype.',
    missing: 'Choisissez un horaire avant de continuer.', complete: 'Confirmation simulée', noBooking: 'Aucun rendez-vous réel n’a été créé.',
    reference: 'Exemple · AT-024', rejection: 'Ce créneau n’est plus disponible :', retry: 'La prestation est conservée. Choisissez un autre horaire.',
    annotations: {
      service: {
        product: { title: 'Ce que l’offre engage', decision: 'La durée, le tarif et les exclusions doivent correspondre à une prestation que l’atelier peut délivrer. Le paiement sur place est un choix de ce scénario, à arbitrer avec le responsable produit.', check: 'Confronter l’offre à la capacité, aux coûts et aux conditions réellement acceptées par l’atelier.' },
        ux: { title: 'Décider avant de choisir un horaire', decision: 'Afficher la durée, le prix et le lieu avant la sélection. Ne pas demander un compte ou une localisation pour simplement examiner la prestation.', check: 'Demander ce qui est inclus, où se rendre et à quel moment le paiement aura lieu, sans expliquer les libellés.' },
        ui: { title: 'Lire la prestation et repérer l’action', decision: 'Le prix, le titre et l’action ont des rôles visuels distincts. Les précisions restent lisibles ; le bouton annonce le choix du créneau, pas une réservation effectuée.', check: 'Essayer les textes traduits, le zoom, les contrastes des deux thèmes et l’accès au bouton au clavier.' },
      },
      slot: {
        product: { title: 'Une disponibilité à garantir', decision: 'La durée de la prestation conditionne la capacité. Un calendrier réel doit gérer les demandes concurrentes ; la maquette ne dispose d’aucune disponibilité serveur.', check: 'Faire préciser qui tient le calendrier, quand il est revalidé et ce qui est garanti avant la confirmation.' },
        ux: { title: 'Sélectionner puis récupérer un refus', decision: 'Conserver la prestation lors d’un retour ou d’un refus. Nommer l’horaire perdu et proposer une autre sélection sans annoncer une confirmation.', check: 'Activer l’incident, choisir un horaire et poursuivre. Vérifier que le message et la reprise sont compris.' },
        ui: { title: 'Distinguer disponible, choisi et indisponible', decision: 'Associer bordure, texte et état programmatique. Les commandes conservent leur taille et le message d’incident reste visible dans les deux thèmes.', check: 'Utiliser Tab puis Entrée ou Espace ; vérifier le focus, l’état choisi et l’annonce de l’erreur.' },
      },
      review: {
        product: { title: 'Nommer la portée de la confirmation', decision: 'Le service réel devra dire si le rendez-vous est garanti ou reste une demande. Ici, la confirmation est explicitement simulée et ne déclenche aucune opération distante.', check: 'Comparer la promesse de l’écran à la règle serveur, aux conditions d’annulation et au travail de support prévus.' },
        ux: { title: 'Relire avant l’engagement', decision: 'Rassembler la prestation, l’horaire, le lieu et le paiement prévu. Permettre de modifier le créneau sans devoir recommencer le choix de prestation.', check: 'Faire expliquer le rendez-vous prévu et corriger l’horaire. Une compréhension supposée n’est pas un résultat d’étude.' },
        ui: { title: 'Rendre le récapitulatif vérifiable', decision: 'Aligner les valeurs et garder un libellé explicite pour l’action. La confirmation finale contient un titre et un texte, pas uniquement une couleur positive.', check: 'Contrôler la lecture à petite largeur, les montants, le focus après action et le message de confirmation simulée.' },
      },
    },
  },
  en: {
    viewpoints: 'Choose a viewpoint', screens: 'Prototype screens',
    roles: { product: 'Product', ux: 'UX', ui: 'UI' }, stages: { service: 'The offer', slot: 'The slot', review: 'The review' },
    decision: 'Decision to record', check: 'Check to prepare', reset: 'Reset the prototype',
    failure: 'Simulate a taken slot', failureReady: 'Failure armed: the next selected slot will be rejected.',
    app: 'Atelier', example: 'FICTIONAL EXAMPLE', service: 'Bicycle service',
    serviceDescription: 'Brakes, drivetrain and tyre pressure.', inclusion: 'Parts not included. Diagnosis before any extra charge.',
    location: 'République workshop', address: '12 Workshop Street · fictional address', duration: '45 min', price: '€39', payment: 'Pay at the workshop',
    availability: 'Illustrative availability', date: 'Tuesday 24 November', chooseTime: 'Choose a time', selected: 'Selected', unavailable: 'Unavailable',
    review: 'Review the appointment', back: 'Return to the previous screen', continue: 'Choose a slot', confirm: 'Simulate confirmation', change: 'Change the slot',
    serviceLabel: 'Service', timeLabel: 'Time', total: 'Expected total', noCard: 'No payment card is requested in this prototype.',
    missing: 'Choose a time before continuing.', complete: 'Simulated confirmation', noBooking: 'No actual appointment has been created.',
    reference: 'Example · AT-024', rejection: 'This slot is no longer available:', retry: 'Your service is retained. Choose another time.',
    annotations: {
      service: {
        product: { title: 'The commitment in the offer', decision: 'Duration, price and exclusions must match a service the workshop can deliver. Paying on site is a choice in this scenario to agree with the product owner.', check: 'Compare the offer with capacity, costs and conditions the workshop actually accepts.' },
        ux: { title: 'Decide before choosing a time', decision: 'Show duration, price and location before selection. Do not request an account or location simply to examine the service.', check: 'Ask what is included, where to go and when payment happens without explaining the labels.' },
        ui: { title: 'Read the service and find the action', decision: 'Price, heading and action have distinct visual roles. Details stay legible; the button announces slot selection, not a completed booking.', check: 'Try translated text, zoom, contrast in both themes and keyboard access to the button.' },
      },
      slot: {
        product: { title: 'Availability needs a guarantee', decision: 'Service duration affects capacity. A real calendar must handle concurrent requests; the mockup has no server availability.', check: 'Identify who maintains the calendar, when it is revalidated and what is guaranteed before confirmation.' },
        ux: { title: 'Select and recover from rejection', decision: 'Keep the service when going back or receiving a rejection. Name the lost time and offer another choice without announcing confirmation.', check: 'Activate the failure, select a time and continue. Examine whether the message and recovery are understood.' },
        ui: { title: 'Distinguish available, selected and unavailable', decision: 'Combine border, text and programmatic state. Controls retain their size and the failure message remains visible in both themes.', check: 'Use Tab and Enter or Space; examine focus, selected state and the error announcement.' },
      },
      review: {
        product: { title: 'State what confirmation means', decision: 'A real service must distinguish a guaranteed appointment from a request. Here confirmation is explicitly simulated and triggers no remote operation.', check: 'Compare the screen’s promise with planned server rules, cancellation conditions and support responsibilities.' },
        ux: { title: 'Review before committing', decision: 'Gather service, time, location and the payment arrangement. Allow a time change without starting service selection again.', check: 'Ask someone to explain the proposed appointment and change its time. Assumed understanding is not a study result.' },
        ui: { title: 'Make the review checkable', decision: 'Align values and keep the action label explicit. Final feedback contains a heading and text rather than only a positive colour.', check: 'Inspect narrow layouts, amounts, focus after action and the simulated-confirmation message.' },
      },
    },
  },
};

/** All viewpoints and screens are exported, including content hidden behind prototype controls. */
export function designLabTranscript(locale: Locale): string {
  const copy = DESIGN_LAB[locale];
  const lines = [copy.example, copy.service, `${copy.duration} · ${copy.price} · ${copy.payment}`, copy.serviceDescription, copy.inclusion, copy.location, copy.address, copy.availability, copy.date, copy.chooseTime, copy.selected, copy.unavailable, copy.review, copy.noCard, copy.missing, copy.complete, copy.noBooking, copy.reference, copy.rejection, copy.retry, copy.failureReady];
  for (const stage of ['service', 'slot', 'review'] as const) {
    lines.push(`#### ${copy.stages[stage]}`);
    for (const role of ['product', 'ux', 'ui'] as const) {
      const annotation = copy.annotations[stage][role];
      lines.push(`**${copy.roles[role]} — ${annotation.title}**`, `${copy.decision}: ${annotation.decision}`, `${copy.check}: ${annotation.check}`);
    }
  }
  return lines.join('\n\n');
}
