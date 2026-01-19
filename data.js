// ES2015+ Feature: Module System - Export data and functions
export const shopInfo = {
    name: "BeanBrew Coffee",
    details: {
        description: "Your daily dose of freshly brewed coffee.",
        location: {
            city: "Seattle",
            address: "123 Coffee Street"
        },
        hours: "Mon-Fri: 7am-8pm"
    },
    owner: {
        name: "Jane Smith",
        contact: {
            email: "jane@beanbrew.com"
        }
    }
};

// Simulating API data fetch with Promise
export function fetchMenu() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { 
                    name: "Espresso", 
                    price: 3.50, 
                    description: "Rich and bold shot of coffee",
                    ingredients: ["Coffee beans", "Water"],
                    image: "https://images.unsplash.com/photo-1579992357154-faf4bde95b3d?w=400&h=300&fit=crop"
                },
                { 
                    name: "Latte", 
                    price: 4.50, 
                    description: "Smooth espresso with steamed milk",
                    ingredients: ["Espresso", "Milk", "Foam"],
                    image: "https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=400&h=300&fit=crop"
                },
                { 
                    name: "Cappuccino", 
                    price: 4.25, 
                    description: "Equal parts espresso, milk, and foam",
                    ingredients: ["Espresso", "Milk", "Foam"],
                    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop"
                },
                { 
                    name: "Mocha", 
                    price: 5.00, 
                    description: "Chocolate-infused coffee delight",
                    ingredients: ["Espresso", "Chocolate", "Milk", "Whipped cream"],
                    image: "https://images.unsplash.com/photo-1607260550778-aa8d84a7cba1?w=400&h=300&fit=crop"
                },
                { 
                    name: "Americano", 
                    price: 3.75, 
                    description: "Espresso diluted with hot water",
                    image: "https://images.unsplash.com/photo-1531835551805-16d864c8d311?w=400&h=300&fit=crop"
                }
            ]);
        }, 1000);
    });
}

// Simulate fetching special offers
export async function fetchSpecialOffers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                hasOffer: true,
                discount: 15,
                message: "15% off all drinks this week!"
            });
        }, 800);
    });
}
