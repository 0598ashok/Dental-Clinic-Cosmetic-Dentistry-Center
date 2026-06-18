// LocalStorage database engine for DentScale Agency & Dental Clinic Demo

const KEY_LEADS = 'dentscale_leads';
const KEY_CREATIVES = 'dentscale_creatives';
const KEY_INVOICES = 'dentscale_invoices';
const KEY_MESSAGES = 'dentscale_messages';
const KEY_APPOINTMENTS = 'dentscale_appointments';
const KEY_CAMPAIGNS = 'dentscale_campaigns';

// Default Mock Data
const DEFAULT_LEADS = [
    { id: 'lead-1', name: 'Sarah Jenkins', phone: '+1 (555) 234-5678', email: 'sjenkins@gmail.com', treatment: 'Veneers', source: 'Facebook Ads', date: '2026-06-15', status: 'Booked', revenue: 4500 },
    { id: 'lead-2', name: 'Michael Chang', phone: '+1 (555) 876-5432', email: 'mchang@outlook.com', treatment: 'Implants', source: 'SEO Search', date: '2026-06-16', status: 'New', revenue: 7500 },
    { id: 'lead-3', name: 'David Ross', phone: '+1 (555) 432-1098', email: 'davidross@yahoo.com', treatment: 'Invisalign', source: 'Google Ads', date: '2026-06-12', status: 'Completed', revenue: 5500 },
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
    { id: 'creative-1', title: 'Summer Smile Makeover Video Ad', type: 'Facebook Video', preview: 'https://images.unsplash.com/photo-1579684389782-64d84b5e901a?auto=format&fit=crop&q=80&w=400', status: 'pending', notes: 'Video showing patient before/after veneers with upbeat, premium background music.', feedback: '' },
    { id: 'creative-2', title: 'Local Search - Dental Implant Landing Page', type: 'Google Landing Page', preview: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400', status: 'approved', notes: 'High converting landing page with client video reviews and direct calendar booking widget.', feedback: '' },
    { id: 'creative-3', title: 'Invisalign Invisible Aligners Graphic', type: 'Instagram Carousel', preview: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400', status: 'rejected', notes: 'Carousel highlighting aligner treatment timeline, pricing breakdown, and payment plans.', feedback: 'Please adjust the brand hex codes to use the primary forest green instead of mint green.' }
];

const DEFAULT_INVOICES = [
    { id: 'INV-2026-003', description: 'Monthly SEO Retainer & PPC Campaign Management', amount: 2350, due: '2026-07-01', status: 'pending' },
    { id: 'INV-2026-002', description: 'Google Ads Media Spend Allocation', amount: 1200, due: '2026-06-15', status: 'paid' },
    { id: 'INV-2026-001', description: 'SaaS Integration & Portal Customization Fee', amount: 500, due: '2026-05-15', status: 'paid' }
];

const DEFAULT_MESSAGES = [
    { id: 'msg-1', sender: 'client', text: 'Hi team! We noticed a huge bump in veneers leads this week. Great job!', time: '10:24 AM' },
    { id: 'msg-2', sender: 'agency', text: 'That\'s awesome to hear, Dr. Jenkins! We scaled the Facebook Video campaigns by 20% on Monday. The CPL is holding steady at $35.', time: '10:45 AM' },
    { id: 'msg-3', sender: 'client', text: 'Perfect. I rejected the Instagram Carousel graphic because of the color alignment. Can we get that updated?', time: '11:02 AM' },
    { id: 'msg-4', sender: 'agency', text: 'Absolutely, we are on it. We will upload the revised graphic to the creative approval panel shortly!', time: '11:15 AM' }
];

const DEFAULT_APPOINTMENTS = [
    { id: 'apt-1', patientName: 'Jane Doe', doctorName: 'Dr. Evelyn Vance', treatment: 'Veneers Consultation', date: '2026-06-19', time: '10:00 AM', status: 'Scheduled', records: 'Prescription_0615.pdf', billingStatus: 'unpaid', amount: 150 },
    { id: 'apt-2', patientName: 'Jane Doe', doctorName: 'Dr. Evelyn Vance', treatment: 'Teeth Whitening', date: '2026-06-25', time: '02:00 PM', status: 'Scheduled', records: '', billingStatus: 'unpaid', amount: 350 },
    { id: 'apt-3', patientName: 'John Smith', doctorName: 'Dr. Marcus Sterling', treatment: 'Dental Implant Post-Op', date: '2026-06-16', time: '09:30 AM', status: 'Completed', records: 'Implant_Report.pdf', billingStatus: 'paid', amount: 450 }
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
    }
};

// Expose to window for access in components
window.DentalStore = store;
