import Camera from '../assets/productIcons/camera.jpg';
import GamingConsole from '../assets/productIcons/gaming-console.jpg';
import Laptop from '../assets/productIcons/laptop.jpg';
import SmartTv from '../assets/productIcons/smart-tv.jpg';
import Smartphone from '../assets/productIcons/smartphone.jpg';
//import Smartwatch from '../assets/productIcons/smartwatch.jpg';
import Tablet from '../assets/productIcons/tablet.jpg';
//import WirelessHeadphones from '../assets/productIcons/wireless-headphones.jpg';


const Products = [
  {
    id: 1,
    name: "Smartphone",
    description: "High-quality smartphone with advanced features.",
    price: 499.99,
    imageURL: Smartphone
  },
  {
    id: 2,
    name: "Laptop",
    description: "Powerful laptop for all your computing needs.",
    price: 999.99,
    imageURL: Laptop
  },
  {
    id: 3,
    name: "Smart TV",
    description: "55-inch Smart TV with 4K Ultra HD resolution.",
    price: 799.99,
    imageURL: SmartTv
  },
  {
    id: 4,
    name: "Tablet",
    description: "Sleek and portable tablet for on-the-go productivity.",
    price: 299.99,
    imageURL: Tablet
  },
  {
    id: 5,
    name: "Gaming Console",
    description: "Next-gen gaming console for immersive gaming experiences.",
    price: 449.99,
    imageURL: GamingConsole
  },
  {
    id: 6,
    name: "Camera",
    description: "Professional-grade camera for stunning photography.",
    price: 699.99,
    imageURL: Camera
  },
  // {
  //   id: 7,
  //   name: "Wireless Headphones",
  //   description: "High-quality wireless headphones for music lovers.",
  //   price: 149.99,
  //   imageURL: WirelessHeadphones
  // },
  // {
  //   id: 8,
  //   name: "Smartwatch",
  //   description: "Feature-packed smartwatch to stay connected and track your fitness.",
  //   price: 199.99,
  //   imageURL: Smartwatch
  // }
];

export default Products;