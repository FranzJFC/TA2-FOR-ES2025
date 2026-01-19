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

// Order management - using modern JavaScript array and object features
let currentOrder = [];

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
            const itemImage = item?.image ?? "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop";
            
            li.innerHTML = `
                <img src="${itemImage}" alt="${itemName}" class="menu-item-img" onerror="this.src='https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop'">
                <strong>${itemName} - $${itemPrice.toFixed(2)}</strong>
                <span>${itemDesc}</span>
                <span style="font-size: 0.85em; color: #888; margin-top: 8px;">Ingredients: ${ingredients}</span>
            `;
            
            // Add "Add to Order" button
            const addButton = document.createElement("button");
            addButton.className = "add-to-order-btn";
            addButton.textContent = "Add to Order";
            addButton.onclick = () => addToOrder(item);
            
            li.appendChild(addButton);
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

// Add item to order
function addToOrder(item) {
    // Using optional chaining and nullish coalescing for safe property access
    const orderItem = {
        id: Date.now(), // Unique ID for each order item
        name: item?.name ?? "Unknown",
        price: item?.price ?? 0
    };
    
    currentOrder.push(orderItem);
    updateOrderDisplay();
    console.log("Added to order:", orderItem.name);
}

// Remove item from order
function removeFromOrder(itemId) {
    currentOrder = currentOrder.filter(item => item?.id !== itemId);
    updateOrderDisplay();
    console.log("Removed item from order");
}

// Update the order display
function updateOrderDisplay() {
    const orderList = document.getElementById("order-list");
    const orderTotal = document.getElementById("order-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    
    // Clear current display
    orderList.innerHTML = "";
    
    // Check if order is empty using optional chaining
    if (!currentOrder?.length) {
        orderList.innerHTML = '<li class="empty-order">Your order is empty. Add some items!</li>';
        orderTotal.textContent = "Total: $0.00";
        checkoutBtn.disabled = true;
        return;
    }
    
    // Display each order item
    let total = 0;
    currentOrder.forEach(item => {
        const li = document.createElement("li");
        
        // Using nullish coalescing for default values
        const itemName = item?.name ?? "Unknown Item";
        const itemPrice = item?.price ?? 0;
        
        li.innerHTML = `
            <div class="item-info">
                <span class="item-name">${itemName}</span>
            </div>
            <span class="item-price">$${itemPrice.toFixed(2)}</span>
        `;
        
        const removeBtn = document.createElement("button");
        removeBtn.className = "remove-btn";
        removeBtn.textContent = "Remove";
        removeBtn.onclick = () => removeFromOrder(item.id);
        
        li.appendChild(removeBtn);
        orderList.appendChild(li);
        
        total += itemPrice;
    });
    
    orderTotal.textContent = `Total: $${total.toFixed(2)}`;
    checkoutBtn.disabled = false;
}

// Checkout function
async function checkout() {
    if (!currentOrder?.length) {
        alert("Your order is empty!");
        return;
    }
    
    const total = currentOrder.reduce((sum, item) => sum + (item?.price ?? 0), 0);
    const itemCount = currentOrder?.length ?? 0;
    
    alert(`Order placed successfully!\n\nItems: ${itemCount}\nTotal: $${total.toFixed(2)}\n\nThank you for your order!`);
    
    console.log("Order placed:", currentOrder);
    
    // Clear the order
    currentOrder = [];
    updateOrderDisplay();
}

// Setup checkout button
document.getElementById("checkout-btn").addEventListener("click", checkout);

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
