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
                    ingredients: ["Coffee beans", "Water"]
                },
                { 
                    name: "Latte", 
                    price: 4.50, 
                    description: "Smooth espresso with steamed milk",
                    ingredients: ["Espresso", "Milk", "Foam"]
                },
                { 
                    name: "Cappuccino", 
                    price: 4.25, 
                    description: "Equal parts espresso, milk, and foam",
                    ingredients: ["Espresso", "Milk", "Foam"]
                },
                { 
                    name: "Mocha", 
                    price: 5.00, 
                    description: "Chocolate-infused coffee delight",
                    ingredients: ["Espresso", "Chocolate", "Milk", "Whipped cream"]
                },
                { 
                    name: "Americano", 
                    price: 3.75, 
                    description: "Espresso diluted with hot water"
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
