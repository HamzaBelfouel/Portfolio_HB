/**
 * Portfolio Professionnel - JavaScript
 * Sophie Martin - Étudiante en sciences comptables
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================================================
    // Navigation
    // ==========================================================================
    
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle menu mobile
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Fermer le menu en cliquant sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar au scroll
    let lastScroll = 0;
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Navigation active selon la section
    const sections = document.querySelectorAll('section[id]');
    
    function setActiveNav() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNav);
    
    // ==========================================================================
    // Portfolio Filters
    // ==========================================================================
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Mettre à jour les boutons actifs
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                const categories = item.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    item.classList.remove('hidden');
                    item.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // ==========================================================================
    // Modal pour les projets
    // ==========================================================================
    
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    
    // Données des projets
    const projectsData = {
        1: {
            title: 'Tableau de bord financier Power BI',
            category: 'Analyse financière',
            date: 'Hiver 2026',
            description: `
                <p>Ce projet consistait à créer un tableau de bord interactif pour analyser les indicateurs clés de performance (KPIs) d'une entreprise manufacturière fictive.</p>
                <h4>Objectifs</h4>
                <ul>
                    <li>Visualiser les revenus, marges et dépenses par division</li>
                    <li>Suivre l'évolution mensuelle des performances</li>
                    <li>Permettre le filtrage par période, région et produit</li>
                    <li>Identifier les tendances et anomalies</li>
                </ul>
                <h4>Compétences démontrées</h4>
                <p>Power BI, DAX, modélisation de données, Excel, visualisation de données, analyse financière.</p>
            `
        },
        2: {
            title: 'États financiers complets - PME',
            category: 'Comptabilité financière',
            date: 'Automne 2025',
            description: `
                <p>Préparation d'un jeu complet d'états financiers selon les Normes comptables pour les entreprises à capital fermé (NCECF) pour une PME du secteur des services professionnels.</p>
                <h4>Livrables</h4>
                <ul>
                    <li>État de la situation financière</li>
                    <li>État des résultats</li>
                    <li>État des bénéfices non répartis</li>
                    <li>État des flux de trésorerie</li>
                    <li>Notes complémentaires aux états financiers</li>
                </ul>
                <h4>Compétences démontrées</h4>
                <p>NCECF, préparation d'états financiers, notes aux états financiers, présentation, Excel.</p>
            `
        },
        3: {
            title: 'Planification fiscale - Cas pratique',
            category: 'Fiscalité',
            date: 'Hiver 2025',
            description: `
                <p>Analyse et optimisation de la situation fiscale d'un particulier exploitant une entreprise incorporée avec des revenus de placement et des activités commerciales.</p>
                <h4>Éléments analysés</h4>
                <ul>
                    <li>Rémunération optimale (salaire vs dividendes)</li>
                    <li>Report d'impôts via REER/CELI</li>
                    <li>Fractionnement du revenu avec le conjoint</li>
                    <li>Planification des gains en capital</li>
                </ul>
                <h4>Compétences démontrées</h4>
                <p>Fiscalité canadienne et québécoise, T1, T2, planification fiscale, analyse de cas.</p>
            `
        },
        4: {
            title: "Programme d'audit - Comptes clients",
            category: 'Audit',
            date: 'Automne 2025',
            description: `
                <p>Élaboration d'un programme d'audit complet pour le cycle des ventes et comptes clients d'une entreprise de distribution de produits électroniques.</p>
                <h4>Composantes du programme</h4>
                <ul>
                    <li>Évaluation des risques et identification des assertions</li>
                    <li>Tests de contrôle du cycle des ventes</li>
                    <li>Tests de corroboration (confirmation, cut-off, provision)</li>
                    <li>Plan d'échantillonnage statistique</li>
                    <li>Documentation des conclusions</li>
                </ul>
                <h4>Compétences démontrées</h4>
                <p>NCA, procédures d'audit, échantillonnage, documentation, Excel.</p>
            `
        },
        5: {
            title: 'Modèle de budget automatisé',
            category: 'Excel',
            date: 'Été 2025',
            description: `
                <p>Développement d'un modèle Excel avancé avec macros VBA pour automatiser la gestion budgétaire et le suivi des écarts d'une PME.</p>
                <h4>Fonctionnalités</h4>
                <ul>
                    <li>Saisie automatisée des données réelles</li>
                    <li>Calcul des écarts budget vs réel</li>
                    <li>Tableaux croisés dynamiques interactifs</li>
                    <li>Graphiques de tendance automatiques</li>
                    <li>Génération de rapports PDF en un clic</li>
                </ul>
                <h4>Compétences démontrées</h4>
                <p>Excel avancé, VBA, macros, tableaux croisés dynamiques, automatisation, modélisation financière.</p>
            `
        },
        6: {
            title: 'Rapport de stage - Deloitte',
            category: 'Stage',
            date: 'Été 2025',
            description: `
                <p>Synthèse des apprentissages et projets réalisés durant mon stage de 4 mois au sein de l'équipe d'audit de Deloitte Canada.</p>
                <h4>Mandats réalisés</h4>
                <ul>
                    <li>Audit d'une PME manufacturière (immobilisations, stocks)</li>
                    <li>Audit d'un OBNL (subventions, revenus reportés)</li>
                    <li>Revue intérimaire d'une société publique</li>
                    <li>Tests de contrôle informatiques (ITGC)</li>
                </ul>
                <h4>Apprentissages clés</h4>
                <p>Travail en équipe, gestion du temps, rigueur professionnelle, communication client, utilisation des outils d'audit.</p>
            `
        },
        7: {
            title: 'Analyse de ratios - Secteur détail',
            category: 'Analyse financière',
            date: 'Hiver 2025',
            description: `
                <p>Étude comparative approfondie des ratios financiers de trois grandes chaînes de détail canadiennes sur une période de 5 ans.</p>
                <h4>Ratios analysés</h4>
                <ul>
                    <li>Ratios de liquidité (courant, rapide)</li>
                    <li>Ratios de rentabilité (ROE, ROA, marge nette)</li>
                    <li>Ratios d'endettement (D/E, couverture des intérêts)</li>
                    <li>Ratios d'efficacité (rotation des stocks, DSO)</li>
                </ul>
                <h4>Compétences démontrées</h4>
                <p>Analyse financière, benchmarking, Excel, interprétation des états financiers, rédaction de rapport.</p>
            `
        },
        8: {
            title: 'Rapprochement bancaire automatisé',
            category: 'Comptabilité',
            date: 'Été 2024',
            description: `
                <p>Création d'un outil Excel pour automatiser les rapprochements bancaires mensuels de multiples comptes clients du cabinet.</p>
                <h4>Fonctionnalités développées</h4>
                <ul>
                    <li>Importation des relevés bancaires CSV</li>
                    <li>Correspondance automatique des transactions</li>
                    <li>Identification des éléments en suspens</li>
                    <li>Génération du rapport de rapprochement</li>
                    <li>Historique des rapprochements précédents</li>
                </ul>
                <h4>Résultat</h4>
                <p>Réduction du temps de rapprochement de 60% pour l'équipe de tenue de livres.</p>
            `
        }
    };
    
    // Ouvrir le modal
    portfolioButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectsData[projectId];
            
            if (project) {
                modalBody.innerHTML = `
                    <span class="portfolio-category">${project.category}</span>
                    <h2>${project.title}</h2>
                    <p class="portfolio-date"><i class="fas fa-calendar"></i> ${project.date}</p>
                    <div class="modal-project-content">
                        ${project.description}
                    </div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fermer le modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // ==========================================================================
    // Animation des barres de compétences
    // ==========================================================================
    
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                skillObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });
    
    // ==========================================================================
    // Animation au scroll (fade in)
    // ==========================================================================
    
    const animateElements = document.querySelectorAll(
        '.apropos-card, .cv-item, .competence-category, .timeline-item, .contact-item'
    );
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        fadeObserver.observe(el);
    });
    
    // ==========================================================================
    // Formulaire de contact
    // ==========================================================================
    
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupérer les données
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulation d'envoi (remplacer par une vraie intégration)
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        setTimeout(function() {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message envoyé !';
            submitBtn.style.backgroundColor = '#10b981';
            
            // Réinitialiser après 3 secondes
            setTimeout(function() {
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
    
    // ==========================================================================
    // Smooth scroll pour les ancres
    // ==========================================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
});
