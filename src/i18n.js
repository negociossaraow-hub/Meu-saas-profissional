import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      heroTitle: "Turn Data into Real Profits: Automated Revenue Solutions",
      heroSubtitle: "Enterprise-level automation that solves cash flow problems. Watch real money hit your account with global payments, private analytics, and luxury-grade security.",
      features: "Exclusive Features",
      feature1: "Live Revenue Monitoring – See Money Flow in Real-Time",
      feature2: "Multi-Currency Payments – Accept Any Global Currency",
      feature3: "Private Technical Insights – Analyze Sensitive Data Securely",
      pricing: "Luxury Pricing Tiers",
      basic: "Starter",
      premium: "Professional",
      enterprise: "Elite",
      contact: "Secure Contact",
      login: "Secure Login",
      signup: "Exclusive Sign Up",
      dashboard: "Executive Dashboard",
      billing: "Premium Billing",
      subscribe: "Subscribe Now",
    }
  },
  pt: {
    translation: {
      heroTitle: "Transforme Dados em Lucros Reais: Soluções de Receita Automatizada",
      heroSubtitle: "Automação de nível empresarial que resolve problemas de fluxo de caixa. Veja dinheiro real cair na sua conta com pagamentos globais, análises privadas e segurança de luxo.",
      features: "Recursos Exclusivos",
      feature1: "Monitoramento de Receita ao Vivo – Veja Dinheiro Fluindo em Tempo Real",
      feature2: "Pagamentos Multi-Moeda – Aceite Qualquer Moeda Global",
      feature3: "Insights Técnicos Privados – Analise Dados Sensíveis com Segurança",
      pricing: "Níveis de Preços de Luxo",
      basic: "Iniciante",
      premium: "Profissional",
      enterprise: "Elite",
      contact: "Contato Seguro",
      login: "Login Seguro",
      signup: "Cadastro Exclusivo",
      dashboard: "Painel Executivo",
      billing: "Cobrança Premium",
      subscribe: "Assinar Agora",
    }
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
