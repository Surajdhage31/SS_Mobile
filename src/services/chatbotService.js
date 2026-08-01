import { products } from '../data/products.js';
import { storeInfo } from '../data/store.js';

// Rule-based reply engine for the AI Assistant. Kept as a plain service
// (no component coupling) so it can later be swapped for a real LLM/API
// call without touching ChatAssistant.jsx — only the body of
// getBotResponse would change.

function formatPrice(value) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function topProductsSummary(list) {
  return list
    .slice(0, 4)
    .map((p) => `${p.name} — ${formatPrice(p.price)}`)
    .join(', ');
}

const intents = [
  {
    name: 'greeting',
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'namaste'],
    respond: () =>
      `Hello! Welcome to ${storeInfo.name}. I can help with product recommendations, prices, specifications, offers, shop timings, or contact details — what would you like to know?`
  },
  {
    name: 'farewell',
    keywords: ['bye', 'goodbye', 'see you', 'thanks', 'thank you'],
    respond: () => `You're welcome! Feel free to come back anytime. Have a great day!`
  },
  {
    name: 'address',
    keywords: ['address', 'location', 'store location', 'where are you'],
    respond: () => `${storeInfo.name} Official Store: ${storeInfo.address}. We have ${storeInfo.outlets} outlets nationwide!`
  },
  {
    name: 'hours',
    keywords: ['hours', 'timing', 'open', 'close', 'when are you open'],
    respond: () => `Store hours: ${storeInfo.hours}. We're open all 7 days a week!`
  },
  {
    name: 'contact',
    keywords: ['contact', 'phone number', 'call you', 'reach you'],
    respond: () => `Call us at ${storeInfo.phone}, or place an order online and we'll call you back!`
  },
  {
    name: 'offers',
    keywords: ['offer', 'deal', 'discount', 'sale', 'festival', 'exchange', 'emi'],
    respond: () =>
      `Current offers: up to 30% off select accessories, free delivery on orders above ₹999, no-cost EMI on phones and TVs, and exchange offers on your old device. Check the Deals section to claim one!`
  },
  {
    name: 'delivery',
    keywords: ['delivery', 'shipping', 'dispatch', 'courier'],
    respond: () => `${storeInfo.delivery}, with free shipping on orders above ₹999 and easy order tracking.`
  },
  {
    name: 'help',
    keywords: ['help', 'support', 'how to', 'navigate'],
    respond: () =>
      `I can help you browse products by category, filter or sort by price, search for a product, compare two devices, or add items to your cart. Just ask!`
  }
];

// Category / product recommendation, keyed off real catalog data.
function tryProductIntent(msg) {
  const categoryMatch = ['smartphone', 'phone', 'mobile', 'tablet', 'tv', 'accessor', 'wearable', 'watch'].find((k) =>
    msg.includes(k)
  );
  const budgetMatch = msg.match(/under\s*₹?\s*(\d{3,7})|below\s*₹?\s*(\d{3,7})|(\d{3,7})\s*budget/);

  if (budgetMatch) {
    const budget = Number(budgetMatch[1] || budgetMatch[2] || budgetMatch[3]);
    const inBudget = products.filter((p) => p.price <= budget).sort((a, b) => b.rating - a.rating);
    if (inBudget.length) {
      return `Within ${formatPrice(budget)}, I'd recommend: ${topProductsSummary(inBudget)}. Want details on any of these?`;
    }
    return `I couldn't find a great match under ${formatPrice(budget)} right now — try raising your budget slightly or ask me about a specific category.`;
  }

  if (msg.includes('recommend') || msg.includes('suggest') || msg.includes('best')) {
    const best = products.slice().sort((a, b) => b.rating - a.rating);
    return `Our top-rated picks right now: ${topProductsSummary(best)}. Ask about any one for full specs!`;
  }

  if (categoryMatch) {
    const categoryKey = categoryMatch.includes('phone') || categoryMatch.includes('mobile') ? 'Smartphones' :
      categoryMatch.includes('tablet') ? 'Tablets' :
      categoryMatch.includes('tv') ? 'Smart TVs' :
      categoryMatch.includes('watch') || categoryMatch.includes('wearable') ? 'Wearables' :
      'Accessories';
    const inCategory = products.filter((p) => p.category === categoryKey);
    if (inCategory.length) {
      return `In ${categoryKey}, popular options are: ${topProductsSummary(inCategory)}. Want prices or specs for one of these?`;
    }
  }

  // Specific product name lookup
  const named = products.find((p) => msg.includes(p.name.toLowerCase().split(' ')[0].toLowerCase()));
  if (named) {
    return `${named.name}: ${named.desc}. Price ${formatPrice(named.price)} (was ${formatPrice(named.originalPrice)}), rated ${named.rating}★ from ${named.reviewsCount.toLocaleString('en-IN')} reviews.`;
  }

  return null;
}

function tryPriceIntent(msg) {
  if (!(msg.includes('price') || msg.includes('cost') || msg.includes('how much') || msg.includes('rate'))) {
    return null;
  }
  const cheapest = products.slice().sort((a, b) => a.price - b.price).slice(0, 3);
  const priciest = products.slice().sort((a, b) => b.price - a.price).slice(0, 3);
  return `Prices range from ${formatPrice(cheapest[0].price)} (${cheapest[0].name}) to ${formatPrice(priciest[0].price)} (${priciest[0].name}). Tell me a category or budget and I'll narrow it down!`;
}

function trySpecIntent(msg) {
  if (!(msg.includes('spec') || msg.includes('feature') || msg.includes('camera') || msg.includes('battery') || msg.includes('5g'))) {
    return null;
  }
  const spec = ['5g', 'camera', 'battery', 'fast charging'].find((s) => msg.includes(s));
  if (spec) {
    const label = spec === '5g' ? '5G' : spec === 'fast charging' ? 'Fast charging' : spec[0].toUpperCase() + spec.slice(1);
    const matches = products.filter((p) => p.specs.includes(label));
    if (matches.length) {
      return `Devices with ${label}: ${topProductsSummary(matches)}.`;
    }
  }
  return `Most of our smartphones include 5G, strong camera systems, and fast charging — tell me which spec matters most and I'll filter our catalog for you.`;
}

function tryContactCapture(msg) {
  const nameMatch = msg.match(/my name is (\w+)/i) || msg.match(/i'?m (\w+)/i);
  const phoneMatch = msg.match(/(\d{10})/);
  const emailMatch = msg.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (nameMatch || phoneMatch || emailMatch) {
    return `Thank you! I've noted your details — our team will get back to you shortly. Anything else I can help with?`;
  }
  return null;
}

export function getBotResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  for (const intent of intents) {
    if (intent.keywords.some((k) => msg.includes(k))) {
      return intent.respond();
    }
  }

  return (
    tryPriceIntent(msg) ||
    trySpecIntent(msg) ||
    tryProductIntent(msg) ||
    tryContactCapture(msg) ||
    `I'm not sure I understood that. Try asking about products, prices, specs, offers, shop timings, or contact details — or leave your name, phone, or email and we'll reach out!`
  );
}

export const quickReplyOptions = [
  { text: 'Recommend a phone', message: 'Recommend a phone for me' },
  { text: 'Prices', message: 'What are your prices?' },
  { text: 'Offers', message: 'Tell me about current offers' },
  { text: 'Shop timings', message: 'What are your shop timings?' },
  { text: 'Contact', message: 'How do I contact you?' }
];
