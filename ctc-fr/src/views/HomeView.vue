<template>
    <div class="home">
      <header class="header">
        <h1>Hehe Shop</h1>
        <input type="text" v-model="searchQuery" placeholder="Search items..." class="search-bar" />
      </header>
      <div class="card-container">
        <div v-for="item in filteredItems" :key="item._id" class="card">
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <img v-if="item.image && item.image.url" :src="item.image.url" style="width: 100%; object-fit: cover;" />
            <p class="card-text">{{ item.description }}</p>
            <p class="card-text"><strong>Category:</strong> {{ item.category }}</p>
            <p class="card-text"><strong>Price:</strong> {{ formatPrice(item.price) }}</p>
            <p class="card-text"><strong>In Stock:</strong> {{ item.countInStock }}</p>
            <a class="btn btn-primary" @click="addItemToCart(item._id)">Add to cart</a>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
import axios from "axios";

export default {
	name: "HomeView",
	data() {
		return {
			items: [],
			searchQuery: "",
		};
	},
	computed: {
		filteredItems() {
			return this.items.filter((item) =>
				item.name.toLowerCase().includes(this.searchQuery.toLowerCase()),
			);
		},

	},
	mounted() {
		this.getAllItems();
	},
	methods: {

        formatPrice(value) {
            const formattedValue = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        return formattedValue.replace(/,00$/,'');
        },

		async getAllItems() {
			try {
				const isiItems = await axios.get(
					`${import.meta.env.VITE_BK_PORT}/item/all-items`,
				);
				this.items = isiItems.data.items;

				if (!isiItems.data.items) {
					console.log("Kosong");
				}
			} catch (error) {
				console.error(error);
			}
		},
        async addItemToCart(itemId) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BK_PORT}/item/cart-items/${itemId}`,
                    {},
                    {
                        withCredentials: true,
                    },
                );
                window.location.href = "/";
            } catch (error) {

                if(error.response.status === 401) {
                    alert("Please log in to add items to cart!");
                    window.location.href = "/login";
                    return;
                }

                console.error("Error adding item to cart:", error);
            }
        },
	},
};
</script>

  <style scoped>
  .home {
    padding: 20px;
    padding-top: 90px;
  }

  .header {
    background-size: cover;
    background-position: center;
    padding: 10px 20px;
    text-align: center;
    color: white;
    margin-bottom: 20px;
  }

  .header h1 {
    margin: 0;
    font-size: 2.5rem;
    color: black
  }

  .search-bar {
    margin-top: 20px;
    padding: 10px;
    width: 100%;
    max-width: 400px;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
    width: 18rem;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  .card-body {
    padding: 15px;
  }

  .card-title {
    font-size: 1.25rem;
    margin-bottom: 10px;
  }

  .card-text {
    font-size: 1rem;
    margin-bottom: 15px;
  }

  .btn {
    background-color: #007bff;
    color: white;
    text-decoration: none;
    padding: 10px 15px;
    border-radius: 5px;
    display: inline-block;
  }

  .btn:hover {
    background-color: #0056b3;
  }
  </style>
