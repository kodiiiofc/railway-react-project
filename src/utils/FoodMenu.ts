export interface FoodItem {
    name: string;
    price: number;
    image: string;
}

export const foodItems: FoodItem[] = [
    {
        name: "Paneer Tikka Rice Bowl - Mini",
        price: 200,
        image: "../src/assets/Paneer_Tikka_Rice_Bowl-Mini.png",
    },
    {
        name: "Grilled Tandori Chicken With Dry Fruits",
        price: 500,
        image: "../src/assets/Grilled_Tandoori_Chicken_with_dry_fruits.png",
    },
    {
        name: "Aloo Paratha Curd Meal (2 pcs)",
        price: 120,
        image: "../src/assets/Aloo_Paratha_Curd_Meal_2pcs.png",
    },
]