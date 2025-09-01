document.addEventListener("DOMContentLoaded", function () {
    // Memory card data
    const memoryCardsData = [
        {
        id: 1,
        date: "LANGUAGE: C#",
        title: "GESDOC - Tramite Documentario",
        imageUrl: "images/munilurin.jpg", // Ruta a tu imagen
        preview: "Desarrollador Full Stack | Implementación de Sistemas Documentarios y Gestión de Proyectos.",
        description: "Lideré el desarrollo e implementación de la base de datos y sistema de trámite documentario GESDOC para la Municipalidad de Lurín. Desarrollé back y front según requerimientos, generé reportes en Excel y PDF en Crystal Reports, y capacite a personal de 10 áreas, siendo gestor principal del proyecto.",
        location: "https://www.gob.pe/munilurin",
        time: "1 Año"
    },
        {
            id: 2,
            date: "LANGUAGE: PHP",
            title: "SISTEMA ASISTENCIA",
            imageUrl: "images/goenjoy.jpg",
            preview: " Analista Desarrollador FullstackJunior,Sistema Web de Asistencia en Tiempo Real | Go Enjoy Perú",
            description: "Diseñé e implementé un sistema de asistencia web en PHP y MySQL para Go Enjoy Perú. Reemplacé el uso de huellero y Excel, permitiendo a RR.HH. y jefes ver la asistencia en tiempo real. El sistema genera reportes mensuales con descuentos por tardanzas y cálculos automáticos de pagos.",
            location: "http://goenjoyasistens.byethost33.com",
            time: "2 Meses"
        },
        {
            id: 3,
            date: "LANGUAGE: C#",
            title: "SISAS - ARQTELIER",
            imageUrl: "images/arqtelier.jpg",
            preview: "SISAS | Sistema de Asistencia y Gestión de Uniformes – Arqtelier",
            description: "Desarrollé en C# y SQL Server el sistema SISAS para Arqtelier, modernizando la gestión de asistencia y uniformes. Reemplacé un software obsoleto con interfaz poco intuitiva, permitiendo a gerentes y jefes supervisar en tiempo real. El sistema optimizó procesos, redujo llamadas innecesarias y mejoró la eficiencia administrativa.",
            location: "akiraassistant-gchmc6esdwb6eqdf.brazilsouth-01.azurewebsites.net",
            time: "1 Mes"
        },
        {
            id: 4,
            date: "FRAMEWORK: ASP.NET Core Web API",
            title: "Repuestos Adrian",
            imageUrl: "images/mecanica.jpg",
            preview: "Sistema Web y API para Inventario y Venta de Repuestos Automotrices",
            description: "Desarrollé una página web y un servicio web en ASP.NET Core para una tienda de repuestos. La web muestra productos, ubicación y contacto directo por correo o WhatsApp. El API gestiona inventario en SQL Server, categorizando piezas como collarines, tensores y bombas de embrague, optimizando stock y búsqueda por marca o número de parte.",
            location: "Localhost:7016",
            time: "2 Meses"
        },
        {
            id: 5,
            date: "FRAMEWORK: ANGULAR",
            title: "SISVET - MARIVET",
            imageUrl: "images/marivet.jpg",
            preview: "MariVET | Sistema Web de Gestión Veterinaria en Desarrollo",
            description: "Actualmente en desarrollo, el sistema MariVET busca digitalizar la gestión de pacientes y optimizar la atención al cliente en la veterinaria. Construido en Angular y desplegado en AWS, permitirá un control integral de historiales clínicos, citas y servicios. Además, se implementará una PC de gama media administrativa para el uso constante del sistema y garantizar un flujo de trabajo eficiente.",
            location: "in working",
            time: "..."
        },
        {
            id: 6,
            date: "PROCESS: Desconocido",
            title: "Proximamente",
            imageUrl: "images/work.png",
            preview: "Desconocido",
            description: "Desconocido",
            location: "cloud-server:port",
            time: "NOW"
        }
    ];

    // Generate memory cards
    const carousel = document.getElementById("memory-carousel");
    memoryCardsData.forEach(cardData => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.memoryId = cardData.id;
        
        // En tu archivo script.js, modifica la plantilla HTML:
card.innerHTML = `
    <div class="card-inner">
        <div class="card-front">
            <div class="card-content">
                <div class="memory-date">${cardData.date}</div>
                <h3>${cardData.title}</h3>
                <div class="memory-image">
                    <img src="${cardData.imageUrl}" alt="${cardData.title}" class="memory-img">
                    <div class="glitch-effect"></div>
                </div>
                <p class="memory-preview">${cardData.preview}</p>
                <div class="card-glow"></div>
            </div>
        </div>
        <div class="card-back">
            <div class="card-content">
                <h3>${cardData.title}</h3>
                <p>${cardData.description}</p>
                <div class="memory-coordinates">
                    <span><i class="fa-solid fa-location-dot"></i> ${cardData.location}</span>
                    <span class="time-stamp"><i class="fa-regular fa-clock"></i> ${cardData.time}</span>
                </div>
            </div>
        </div>
    </div>
`;
        
        carousel.appendChild(card);
    });

    // Elements
    const cards = document.querySelectorAll(".memory-card");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Variables
    let currentIndex = 0;
    let startX, startY;
    let isDragging = false;
    let theta = 0;
    let radius = window.innerWidth <= 768 ? 250 : 400;
    const totalCards = cards.length;

    // Initialize
    function init() {
        // Position cards in a circle
        arrangeCards();

        // Add event listeners
        prevBtn.addEventListener("click", prevCard);
        nextBtn.addEventListener("click", nextCard);
        cards.forEach((card) => {
            card.addEventListener("click", flipCard);
        });

        // Touch/mouse events for dragging
        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("touchstart", dragStart, { passive: true });
        document.addEventListener("mousemove", drag);
        document.addEventListener("touchmove", drag, { passive: false });
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("touchend", dragEnd);

        // Keyboard navigation
        document.addEventListener("keydown", handleKeyDown);

        // Start ambient sound
        playAmbientSound();
    }

    // Arrange cards in a circle
    function arrangeCards() {
        const angle = 360 / totalCards;
        cards.forEach((card, index) => {
            // Calculate the angle for this card
            const cardAngle = angle * index;
            // Convert to radians
            const rad = (cardAngle * Math.PI) / 180;
            // Calculate position
            const x = radius * Math.sin(rad);
            const z = radius * Math.cos(rad) * -1;

            // Apply transform
            card.style.transform = `rotateY(${cardAngle}deg) translateZ(${radius}px)`;

            // Store the card's index
            card.dataset.index = index;
        });
    }

    // Rotate carousel
    function rotateCarousel() {
        carousel.style.transform = `rotateY(${theta}deg)`;

        // Update current card index
        currentIndex = Math.round(
            Math.abs(theta / (360 / totalCards)) % totalCards
        );
        if (currentIndex >= totalCards) currentIndex = 0;
    }

    // Next card
    function nextCard() {
        theta -= 360 / totalCards; // Changed direction to match swipe
        rotateCarousel();
    }

    // Previous card
    function prevCard() {
        theta += 360 / totalCards; // Changed direction to match swipe
        rotateCarousel();
    }

    // Flip card
    function flipCard(e) {
        const card = e.currentTarget;
        const cardIndex = parseInt(card.dataset.index);

        // Only flip the current front-facing card
        if (cardIndex === currentIndex) {
            card.classList.toggle("flipped");
        }
    }

    // Drag functions
    function dragStart(e) {
        e.preventDefault(); // Prevent default behavior
        isDragging = true;
        startX = e.pageX || e.touches[0].pageX;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault(); // Prevent default scrolling

        const currentX = e.pageX || (e.touches ? e.touches[0].pageX : startX);
        const diffX = currentX - startX;

        // Rotate based on drag distance - FIXED DIRECTION
        const sensitivity = 0.5;
        const newTheta = theta + diffX * sensitivity;

        carousel.style.transform = `rotateY(${newTheta}deg)`;
    }

    function dragEnd(e) {
        if (!isDragging) return;
        isDragging = false;

        const currentX =
            e.pageX || (e.changedTouches ? e.changedTouches[0].pageX : startX);
        const diffX = currentX - startX;

        // FIXED DIRECTION: If swiping right, show previous card (theta increases)
        // If swiping left, show next card (theta decreases)
        if (Math.abs(diffX) > 20) {
            if (diffX > 0) {
                prevCard(); // Swipe right to see previous card
            } else {
                nextCard(); // Swipe left to see next card
            }
        } else {
            // Snap to the closest card
            const anglePerCard = 360 / totalCards;
            const snapAngle = Math.round(theta / anglePerCard) * anglePerCard;
            theta = snapAngle;
            rotateCarousel();
        }
    }

    // Keyboard navigation
    function handleKeyDown(e) {
        if (e.key === "ArrowLeft") {
            nextCard(); // Changed to match swipe direction
        } else if (e.key === "ArrowRight") {
            prevCard(); // Changed to match swipe direction
        } else if (e.key === "Enter" || e.key === " ") {
            const currentCard = document.querySelector(
                `.memory-card[data-index="${currentIndex}"]`
            );
            if (currentCard) {
                currentCard.classList.toggle("flipped");
            }
        }
    }

    // Play ambient sound
    function playAmbientSound() {
        // Optional: Add ambient sound if needed
    }

    // Resize handler
    window.addEventListener("resize", () => {
        radius = window.innerWidth <= 768 ? 250 : 400;
        arrangeCards();
        rotateCarousel();
    });

    // Initialize the carousel
    init();
});