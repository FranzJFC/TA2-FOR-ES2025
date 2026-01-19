// ✅ ES2015+ Feature: Module System - Import from external JS file
import { shopInfo, fetchMenu, fetchSpecialOffers } from './data.js';

// ✅ ES2020+ Feature: Optional Chaining (?.)
// Safely accesses nested properties without throwing errors if parent is null/undefined
const description = shopInfo?.details?.description ?? "No description available";
const location = shopInfo?.details?.location?.city ?? "Location not specified";
const ownerEmail = shopInfo?.owner?.contact?.email ?? "No contact available";
const hours = shopInfo?.details?.hours ?? "Hours not available";

// ✅ ES2020+ Feature: Nullish Coalescing (??)
// Provides default values when data is null or undefined (not for falsy values like 0 or "")
const shopName = shopInfo?.name ?? "Coffee Shop";

// Display shop information
const document_title = document.getElementById("title");
document_title.textContent = shopName;

const document_desc = document.getElementById("desc");
document_desc.textContent = `${description} | ${location} | ${hours}`;

// ✅ ES2017+ Feature: Async/Await with Promise
// Modern way to handle asynchronous operations
async function loadMenu() {
    try {
        // Simulate loading state
        console.log("Loading menu...");
        
        // Await the Promise to get menu data
        const menu = await fetchMenu();
        const list = document.getElementById("menu");
        
        // Display each menu item
        menu.forEach(item => {
            const li = document.createElement("li");
            
            // Using optional chaining to safely access nested properties
            const itemName = item?.name ?? "Unknown Item";
            const itemPrice = item?.price ?? 0;
            const itemDesc = item?.description ?? "No description";
            const ingredients = item?.ingredients?.join(", ") ?? "Ingredients not listed";
            
            li.innerHTML = `
                <strong>${itemName} - $${itemPrice.toFixed(2)}</strong>
                <span>${itemDesc}</span>
                <span style="font-size: 0.85em; color: #888; margin-top: 8px;">Ingredients: ${ingredients}</span>
            `;
            
            list.appendChild(li);
        });
        
        console.log("Menu loaded successfully!");
        
        // Load special offers asynchronously
        await loadSpecialOffers();
        
    } catch (error) {
        console.error("Error loading menu:", error);
        document.getElementById("menu").innerHTML = "<li>Error loading menu. Please try again later.</li>";
    }
}

// Another async function demonstrating await
async function loadSpecialOffers() {
    const offers = await fetchSpecialOffers();
    
    // Using optional chaining and nullish coalescing for safe data access
    const hasOffer = offers?.hasOffer ?? false;
    const discount = offers?.discount ?? 0;
    const message = offers?.message ?? "No offers available";
    
    if (hasOffer) {
        console.log(`Special Offer: ${message}`);
        // Could display this in the UI if needed
    }
}

// Initialize the application
loadMenu();
