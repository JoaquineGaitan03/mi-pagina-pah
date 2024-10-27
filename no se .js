// Esperar a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar el efecto de typing
    initTypingEffect();
    
    // Inicializar el botón de scroll
    initScrollToTop();
    
    // Inicializar la barra de progreso
    initProgressBar();
    
    // Inicializar el modo oscuro
    initDarkMode();
    
    // Inicializar el menú hamburguesa
    initMobileMenu();
    
    // Inicializar los tabs
    initTabs();
    
    // Inicializar el filtro de proyectos
    initProjectFilter();
    
    // Inicializar el formulario de contacto
    initContactForm();
});

// Efecto de typing
function initTypingEffect() {
    const options = {
        strings: ['Desarrollador Web', 'Diseñador UI/UX', 'Freelancer'],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 1500,
        loop: true
    };
    
    if(document.querySelector('#typed')) {
        new Typed('#typed', options);
    }
}

// Botón de scroll hacia arriba
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Barra de progreso de scroll
function initProgressBar() {
    window.addEventListener('scroll', function() {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    });
}

// Modo oscuro
function initDarkMode() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Verificar si hay un tema guardado
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        
        // Guardar preferencia
        localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark-mode' : '');
    });
}

// Menú móvil
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        menu.classList.toggle('active');
    });
}

// Tabs en la sección "Sobre mí"
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remover clases activas
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clases activas al tab seleccionado
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Filtro de proyectos
function initProjectFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            
            // Remover clase activa de todos los botones
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Agregar clase activa al botón seleccionado
            this.classList.add('active');
            
            // Filtrar proyectos
            projects.forEach(project => {
                if (filter === 'all' || project.dataset.category === filter) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });
}

// Formulario de contacto
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores del formulario
            const formData = {
                name: this.querySelector('#nombre').value,
                email: this.querySelector('#email').value,
                message: this.querySelector('#mensaje').value
            };
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando fetch para enviar a un backend
            
            // Ejemplo de mensaje de éxito
            alert('¡Mensaje enviado con éxito!');
            form.reset();
        });
    }
}

// Animación suave para los enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Animación de elementos al hacer scroll
function revealOnScroll() {
    const elements = document.querySelectorAll('.reveal');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Validación del formulario
function validateForm(formData) {
    const errors = {};
    
    if (!formData.name.trim()) {
        errors.name = 'El nombre es requerido';
    }
    
    if (!formData.email.trim()) {
        errors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'El email no es válido';
    }
    
    if (!formData.message.trim()) {
        errors.message = 'El mensaje es requerido';
    }
    
    return errors;
}

// Observador de intersección para animaciones
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate-on-scroll').forEach((element) => {
    observer.observe(element);
});