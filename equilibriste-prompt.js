// equilibriste-prompt.js - Fonctions de génération de prompt pour l'Équilibriste

function generateEquilibristePart1(objet) {
    const objetDesc = getObjetDescription(objet);
    
    return `
🎪 SÉQUENCE ÉQUILIBRISTE - PARTIE 1 :

Elle entre en scène, ${objetDesc} parfaitement équilibré sur sa tête.

MOUVEMENTS D'ÉQUILIBRE :
- Elle avance lentement, chaque pas calculé avec précision
- Ses bras s'ouvrent gracieusement en balancier
- Son regard alterne entre l'objet et la caméra
- Elle exécute des rotations lentes, l'objet restant immobile
- Des poses sur une jambe défient la gravité
- Son sourire est confiant, presque provocateur

JEUX DE REGARDS :
- Elle lève les yeux vers l'objet sans bouger la tête
- Puis plonge son regard dans la caméra, complice
- Elle semble dire "Regarde ce que je peux faire"

AMBiance :
- Spot unique éclaire la scène
- Ombre portée au sol
- Public silencieux, retenant son souffle
- Tension palpable dans l'air`;
}

function generateEquilibristePart2(objet, options) {
    const objetDesc = getObjetDescription(objet);
    const regardObjet = options.regardObjet ? "Elle lève fréquemment les yeux vers l'objet, vérifiant sa stabilité du regard" : "";
    const suspense = options.suspense ? "Les mouvements ralentissent, la tension monte..." : "";
    const rattrape = options.rattrape ? "elle le rattrape au vol avec une grâce parfaite" : "il tombe au sol dans un bruit sourd";
    const chuteMoment = options.chuteMoment || "fin";
    
    let chuteDesc = "";
    if (chuteMoment === "fin") {
        chuteDesc = "À la toute dernière seconde, alors qu'elle esquisse un dernier mouvement victorieux, l'objet bascule...";
    } else if (chuteMoment === "avant-derniere") {
        chuteDesc = "À l'avant-dernière seconde, l'objet commence à vaciller... Elle tente de le stabiliser...";
    } else {
        chuteDesc = "Au ralenti, l'objet se met à tanguer de plus en plus, semblant défier les lois de la physique avant de chuter...";
    }
    
    return `
🎪 SÉQUENCE ÉQUILIBRISTE - PARTIE 2 - FINALE SUSPENSE :

${objetDesc} toujours en équilibre parfait sur sa tête.

MOUVEMENTS PLUS AUDACIEUX :
- Ses mouvements deviennent plus fluides, plus sensuels
- Elle ose des déhanchés, des cambrures
- Ses mains caressent son corps tout en surveillant l'objet
- Elle tourne, virevolte, l'objet suivant ses mouvements
${regardObjet ? "- " + regardObjet : ""}

${suspense}

🎯 MOMENT CRITIQUE - CHUTE DE L'OBJET :
${chuteDesc}

L'objet tombe dans les airs...

👐 RÉACTION ÉCLAIR :
Avec une rapidité incroyable, elle tend les bras vers le ciel et ${rattrape}.

⏱️ DERNIÈRE FRACTION DE SECONDE :
Ses doigts se referment sur l'objet, un sourire de victoire éclaire son visage...

🌑 FIN BRUTALE :
L'image se coupe NET au moment précis où ses doigts touchent l'objet, laissant le spectateur sur cette image figée, sans savoir si la rattrape est vraiment réussie.

SUSPENCE ABSOLU - FIN OUVERTE.`;
}

// Ajouter au PromptGenerator existant
function enhancePromptGenerator() {
    if (window.PromptGenerator) {
        // Sauvegarder les méthodes originales
        const originalGeneratePart1 = PromptGenerator.prototype.generatePart1;
        const originalGeneratePart2 = PromptGenerator.prototype.generatePart2;
        
        // Surcharger pour l'équilibriste
        PromptGenerator.prototype.generatePart1 = function() {
            const equilibristeActive = document.getElementById('enableEquilibriste')?.checked || false;
            const selectedCard = document.querySelector('.character-card.selected');
            const isEquilibriste = selectedCard && selectedCard.textContent.includes('Équilibriste');
            
            if (equilibristeActive && isEquilibriste) {
                const objet = document.getElementById('equilibreObjet')?.value || 'un pot de Nutella';
                return generateEquilibristePart1(objet);
            }
            
            return originalGeneratePart1.call(this);
        };
        
        PromptGenerator.prototype.generatePart2 = function() {
            const equilibristeActive = document.getElementById('enableEquilibriste')?.checked || false;
            const selectedCard = document.querySelector('.character-card.selected');
            const isEquilibriste = selectedCard && selectedCard.textContent.includes('Équilibriste');
            
            if (equilibristeActive && isEquilibriste) {
                const objet = document.getElementById('equilibreObjet')?.value || 'un pot de Nutella';
                const options = {
                    regardObjet: document.getElementById('equilibreRegardObjet')?.checked || false,
                    suspense: document.getElementById('equilibreSuspense')?.checked || false,
                    rattrape: document.getElementById('equilibreRatrappe')?.checked || false,
                    chuteMoment: document.getElementById('equilibreChuteMoment')?.value || 'fin'
                };
                return generateEquilibristePart2(objet, options);
            }
            
            return originalGeneratePart2.call(this);
        };
        
        console.log("🎪 PromptGenerator amélioré avec Équilibriste");
    }
}

// Attendre que PromptGenerator soit chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enhancePromptGenerator);
} else {
    enhancePromptGenerator();
}
