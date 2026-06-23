// LocalStorage database engine for Vance Cosmetic Dentistry Center
// Consolidates both Patient Portal databases and Clinic Management structures

const KEY_LEADS = 'dentscale_leads';
const KEY_CREATIVES = 'dentscale_creatives';
const KEY_INVOICES = 'dentscale_invoices';
const KEY_MESSAGES = 'dentscale_messages';
const KEY_APPOINTMENTS = 'dentscale_appointments';
const KEY_CAMPAIGNS = 'dentscale_campaigns';
const KEY_TREATMENT_PLANS = 'dentscale_treatment_plans';

// Default Mock Data
const DEFAULT_LEADS = [
    { id: 'lead-1', name: 'Sarah Jenkins', phone: '+1 (555) 234-5678', email: 'sjenkins@gmail.com', treatment: 'Veneers', source: 'Website Form', date: '2026-06-15', status: 'Booked', revenue: 4500 },
    { id: 'lead-2', name: 'Michael Chang', phone: '+1 (555) 876-5432', email: 'mchang@outlook.com', treatment: 'Implants', source: 'SEO Search', date: '2026-06-16', status: 'New', revenue: 7500 },
    { id: 'lead-3', name: 'David Ross', phone: '+1 (555) 432-1098', email: 'davidross@yahoo.com', treatment: 'Invisalign', source: 'Referral', date: '2026-06-12', status: 'Completed', revenue: 5500 },
    { id: 'lead-4', name: 'Emily Taylor', phone: '+1 (555) 789-0123', email: 'emily.taylor@gmail.com', treatment: 'Whitening', source: 'Google Ads', date: '2026-06-16', status: 'Contacted', revenue: 450 },
    { id: 'lead-5', name: 'Robert Garcia', phone: '+1 (555) 345-6789', email: 'rgarcia@gmail.com', treatment: 'Cosmetic Bonding', source: 'SEO Search', date: '2026-06-14', status: 'Booked', revenue: 1200 }
];

const DEFAULT_CAMPAIGNS = {
    googleSpend: 1200,
    googleLeads: 28,
    googleRevenue: 11000,
    fbSpend: 850,
    fbLeads: 34,
    fbRevenue: 8700,
    seoSpend: 1500,
    seoLeads: 42,
    seoRevenue: 18500
};

const DEFAULT_CREATIVES = [
    { id: 'creative-1', title: 'Summer Smile Makeover Video Ad', type: 'Facebook Video', preview: 'https://images.unsplash.com/photo-1579684389782-64d84b5e9053?auto=format&fit=crop&q=80&w=400', status: 'pending', notes: 'Video showing patient before/after veneers with upbeat, premium background music.', feedback: '' },
    { id: 'creative-2', title: 'Local Search - Dental Implant Landing Page', type: 'Google Landing Page', preview: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=400', status: 'approved', notes: 'High converting landing page with client video reviews and direct calendar booking widget.', feedback: '' },
    { id: 'creative-3', title: 'Invisalign Invisible Aligners Graphic', type: 'Instagram Carousel', preview: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=400', status: 'rejected', notes: 'Carousel highlighting aligner treatment timeline, pricing breakdown, and payment plans.', feedback: 'Please adjust the brand hex codes to use the primary forest green instead of mint green.' }
];

const DEFAULT_INVOICES = [
    { id: 'INV-2026-003', description: 'Porcelain Veneers Procedure — Arch Preparation (Dr. Vance)', amount: 3800, due: '2026-07-01', status: 'pending' },
    { id: 'INV-2026-002', description: 'Dental Implant Surgical Extraction (Dr. Sterling)', amount: 2400, due: '2026-06-15', status: 'paid' },
    { id: 'INV-2026-001', description: 'Comprehensive Oral Exam & 3D Imaging (Dr. Vance)', amount: 350, due: '2026-05-15', status: 'paid' }
];

const DEFAULT_MESSAGES = [
    { id: 'msg-1', sender: 'client', text: 'Hello, Dr. Vance. I am loving my temporary veneers! They feel extremely natural. When is my final placement appointment?', time: '10:24 AM' },
    { id: 'msg-2', sender: 'agency', text: 'Hi Jane! We are delighted you like them! Your permanent porcelain veneers have arrived from the lab. Your placement session is booked for this Friday, June 19, at 10:00 AM.', time: '10:45 AM' },
    { id: 'msg-3', sender: 'client', text: 'Perfect. Do I need to avoid any specific foods before the appointment?', time: '11:02 AM' },
    { id: 'msg-4', sender: 'agency', text: 'Just avoid extremely sticky or hard foods on the temporary shells. Other than that, you are good to go. We will see you on Friday!', time: '11:15 AM' }
];

const DEFAULT_APPOINTMENTS = [
    { id: 'apt-1', patientName: 'Jane Doe', doctorName: 'Dr. Evelyn Vance', treatment: 'Porcelain Veneers Prep', date: '2026-06-19', time: '10:00 AM', status: 'Scheduled', records: 'Treatment_Plan_Veneers.pdf', billingStatus: 'unpaid', amount: 3800 },
    { id: 'apt-2', patientName: 'Jane Doe', doctorName: 'Dr. Evelyn Vance', treatment: 'Teeth Whitening Followup', date: '2026-06-25', time: '02:00 PM', status: 'Scheduled', records: '', billingStatus: 'unpaid', amount: 350 },
    { id: 'apt-3', patientName: 'Jane Doe', doctorName: 'Dr. Marcus Sterling', treatment: 'Dental Implant Extraction', date: '2026-06-16', time: '09:30 AM', status: 'Completed', records: 'Implant_Report_June16.pdf', billingStatus: 'paid', amount: 2400 }
];

const DEFAULT_TREATMENT_PLANS = [
    { id: 'step-1', title: 'Intraoral 3D Imaging Scan', desc: 'Completed during your first diagnostic visit on June 10, 2026.', status: 'completed' },
    { id: 'step-2', title: 'Smile Design Approval', desc: '3D Mockup approved by Dr. Evelyn Vance & patient on June 15, 2026.', status: 'completed' },
    { id: 'step-3', title: 'Preparation & Temp Veneers', desc: 'Scheduled on Friday, June 19, 2026. Teeth preparation and temp placement.', status: 'active' },
    { id: 'step-4', title: 'Porcelain Veneers Bonding', desc: 'Scheduled on Thursday, June 25, 2026. Permanent cementation of veneers.', status: 'pending' },
    { id: 'step-5', title: 'Final Smile Follow-up Check', desc: 'Scheduled on July 5, 2026. Verification of bite alignment.', status: 'pending' }
];

// Helper to get and set local storage item
function getStorage(key, defaultValue) {
    const data = localStorage.getItem(key);
    if (!data) {
        localStorage.setItem(key, JSON.stringify(defaultValue));
        return defaultValue;
    }
    return JSON.parse(data);
}

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Initialise Database
const store = {
    // Getters
    getLeads: () => getStorage(KEY_LEADS, DEFAULT_LEADS),
    getCampaigns: () => getStorage(KEY_CAMPAIGNS, DEFAULT_CAMPAIGNS),
    getCreatives: () => getStorage(KEY_CREATIVES, DEFAULT_CREATIVES),
    getInvoices: () => getStorage(KEY_INVOICES, DEFAULT_INVOICES),
    getMessages: () => getStorage(KEY_MESSAGES, DEFAULT_MESSAGES),
    getAppointments: () => getStorage(KEY_APPOINTMENTS, DEFAULT_APPOINTMENTS),
    getTreatmentPlans: () => getStorage(KEY_TREATMENT_PLANS, DEFAULT_TREATMENT_PLANS),

    // Setters / Updates
    addLead: (lead) => {
        const leads = store.getLeads();
        leads.unshift({ id: `lead-${Date.now()}`, date: new Date().toISOString().split('T')[0], ...lead });
        setStorage(KEY_LEADS, leads);
    },
    updateLeadStatus: (id, status) => {
        const leads = store.getLeads();
        const index = leads.findIndex(l => l.id === id);
        if (index !== -1) {
            leads[index].status = status;
            setStorage(KEY_LEADS, leads);
        }
    },
    updateCampaigns: (campaigns) => {
        setStorage(KEY_CAMPAIGNS, campaigns);
    },
    updateCreativeStatus: (id, status, feedback = '') => {
        const creatives = store.getCreatives();
        const index = creatives.findIndex(c => c.id === id);
        if (index !== -1) {
            creatives[index].status = status;
            if (feedback) creatives[index].feedback = feedback;
            setStorage(KEY_CREATIVES, creatives);
        }
    },
    addInvoice: (invoice) => {
        const invoices = store.getInvoices();
        invoices.unshift({ id: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`, ...invoice });
        setStorage(KEY_INVOICES, invoices);
    },
    updateInvoiceStatus: (id, status) => {
        const invoices = store.getInvoices();
        const index = invoices.findIndex(inv => inv.id === id);
        if (index !== -1) {
            invoices[index].status = status;
            setStorage(KEY_INVOICES, invoices);
        }
    },
    addMessage: (sender, text) => {
        const messages = store.getMessages();
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messages.push({ id: `msg-${Date.now()}`, sender, text, time });
        setStorage(KEY_MESSAGES, messages);
    },
    addAppointment: (apt) => {
        const appointments = store.getAppointments();
        appointments.unshift({ id: `apt-${Date.now()}`, status: 'Scheduled', records: '', billingStatus: 'unpaid', ...apt });
        setStorage(KEY_APPOINTMENTS, appointments);
    },
    updateAppointmentStatus: (id, status) => {
        const appointments = store.getAppointments();
        const index = appointments.findIndex(a => a.id === id);
        if (index !== -1) {
            appointments[index].status = status;
            setStorage(KEY_APPOINTMENTS, appointments);
        }
    },
    updateAppointmentBilling: (id, billingStatus) => {
        const appointments = store.getAppointments();
        const index = appointments.findIndex(a => a.id === id);
        if (index !== -1) {
            appointments[index].billingStatus = billingStatus;
            setStorage(KEY_APPOINTMENTS, appointments);
        }
    },
    updateTreatmentPlanStepStatus: (id, status) => {
        const plans = store.getTreatmentPlans();
        const index = plans.findIndex(p => p.id === id);
        if (index !== -1) {
            plans[index].status = status;
            setStorage(KEY_TREATMENT_PLANS, plans);
        }
    }
};

window.DentalStore = store;

// Global Interactive Components Controller
document.addEventListener('DOMContentLoaded', () => {
    // 1. Before & After Sliders Initialisation
    const initSliders = () => {
        const sliders = document.querySelectorAll('.gallery-slider');
        sliders.forEach(slider => {
            const resize = slider.querySelector('.gallery-resize');
            const handle = slider.querySelector('.gallery-handle');
            if (!resize || !handle) return;
            const img = resize.querySelector('.gallery-img');
            
            const setWidth = () => {
                if (img) img.style.width = slider.offsetWidth + 'px';
            };
            setWidth();
            window.addEventListener('resize', setWidth);
            
            const drag = (e) => {
                let clientX;
                if (e.clientX !== undefined) {
                    clientX = e.clientX;
                } else if (e.touches && e.touches[0]) {
                    clientX = e.touches[0].clientX;
                } else {
                    return;
                }
                const rect = slider.getBoundingClientRect();
                let x = clientX - rect.left;
                if (x < 0) x = 0;
                if (x > rect.width) x = rect.width;
                const pct = (x / rect.width) * 100;
                resize.style.width = pct + '%';
                handle.style.left = pct + '%';
            };
            
            let active = false;
            
            const onStart = (e) => {
                active = true;
                slider.classList.add('dragging');
                drag(e);
            };
            
            const onEnd = () => {
                active = false;
                slider.classList.remove('dragging');
            };
            
            handle.addEventListener('mousedown', onStart);
            handle.addEventListener('touchstart', onStart);
            window.addEventListener('mouseup', onEnd);
            window.addEventListener('touchend', onEnd);
            
            window.addEventListener('mousemove', (e) => { if (active) drag(e); });
            window.addEventListener('touchmove', (e) => { if (active) drag(e); });
            
            slider.addEventListener('click', (e) => {
                if (e.target !== handle && !handle.contains(e.target)) {
                    drag(e);
                }
            });
        });
    };
    initSliders();

    // 2. FAQ Accordions Controller
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 3. Hamburger Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('open');
        });
        
        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('open');
            });
        });
    }
});

// Scroll Carousel helper function for horizontal scroll snapping
function scrollCarousel(id, direction) {
    const container = document.getElementById(id);
    if (container) {
        const item = container.querySelector('.scroll-item-1, .scroll-item-2, .scroll-item-3, .scroll-item-4, .scroll-item-5, .scroll-item-6, .minimalist-scroll-item');
        if (item) {
            const cardWidth = item.offsetWidth + parseInt(window.getComputedStyle(container).gap || 28);
            container.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
        }
    }
}
