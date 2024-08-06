<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <RouterLink class="navbar-brand" to="/">
          Hehe Boi
        </RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav ms-auto">
            <RouterLink class="nav-link" :class="{ 'active-link': $route.path === '/' }" to="/">Home</RouterLink>

            <div v-if="isLoggedIn" class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><RouterLink class="dropdown-item" :class="{ 'active-link': $route.path === '/profile' }" to="/profile">Profile</RouterLink></li>
                <li><RouterLink class="dropdown-item" :class="{ 'active-link': $route.path === '/contacts' }" to="/contacts">Contacts</RouterLink></li>
                <li><a class="dropdown-item" href="#" @click="logout">Logout</a></li>
              </ul>
            </div>
            <RouterLink v-else class="nav-link" :class="{ 'active-link': $route.path === '/login' }" to="/login">Sign In</RouterLink>

            <!-- Cart Dropdown -->
            <div class="nav-item dropdown" @click.stop>
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="cartDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i class="fas fa-shopping-cart"></i> Cart
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="cartDropdown">
                <li v-if="cartItems.length === 0" class="dropdown-item">No items in cart</li>
                <li v-for="item in cartItems" :key="item._id" class="dropdown-item cart-item">
                  <div class="cart-item-details">
                    <span><strong>{{ item.name }}</strong></span>
                    <p>Description: {{ item.description }}</p>
                    <p>Price: {{ formatPrice(item.price) }}</p>
                    <div class="quantity-controls">
                      <button class="quantity-button" @click.stop="decreaseQuantity(item._id)">-</button>
                      <span class="quantity-display">{{ item.quantity }}</span>
                      <button class="quantity-button" @click.stop="increaseQuantity(item._id, item.quantity)">+</button>
                    </div>
                    <div class="action-buttons">
                      <button @click.stop="removeItem(item._id)" class="remove-button">Remove</button>
                      <button @click.stop="checkoutItem(item)" class="checkout-button">Checkout</button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </template>

  <script>
import { RouterLink } from "vue-router";
import axios from "axios";

export default {
	name: "Navbar",
	data() {
		return {
			loggedIn: false,
			cartItems: [],
		};
	},

	computed: {
		isLoggedIn() {
			return this.loggedIn;
		},

	},

	methods:
    {
        formatPrice(value) {
            const formattedValue = new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }).format(value);
        return formattedValue.replace(/,00$/, '');
        },
		async checkLoginStatus() {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BK_PORT}/user/current`, {
					withCredentials: true,
				});
				this.loggedIn = response.data.loggedIn;
			} catch (error) {
				this.loggedIn = false;
			}
		},

		async logout() {
			try {
				await axios.post(
					`${import.meta.env.VITE_BK_PORT}/user/logout`,
					{},
					{
						withCredentials: true,
					},
				);
				this.loggedIn = false;
				window.location.href = "/login";
			} catch (error) {
				console.error("Error logging out:", error);
			}
		},

		async dataCart() {
			try {
				const response = await axios.get(
					`${import.meta.env.VITE_BK_PORT}/item/cart-data`,
					{
						withCredentials: true,
					},
				);
				this.cartItems = response.data.cart.items;

			} catch (error) {

			}
		},

		async updateQuantity(item, action) {
			try {
				await axios.put(
					`${import.meta.env.VITE_BK_PORT}/item/update-quantity/${item}`,
					{ action },
					{
						withCredentials: true,
					},
				);

                    this.dataCart();
			} catch (error) {
				console.error("Error updating quantity", error);
			}
		},

		async removeItem(item) {

			try {
				await axios.delete(
					`${import.meta.env.VITE_BK_PORT}/item/delete-cart-item/${item}`,
					{
						withCredentials: true,
					},
				);
                this.dataCart();
			} catch (error) {
				console.error("Error removing item", error);
			}
		},

		increaseQuantity(itemID) {
			this.updateQuantity(itemID, "increase");
		},

		decreaseQuantity(itemID) {

				this.updateQuantity(itemID, "decrease");
		},

		checkoutItem(item) {
			// Implement checkout functionality here
			console.log("Checkout item:", item);
		},
	},

	mounted() {
		this.checkLoginStatus();
        this.dataCart();
	},
};
</script>

  <style scoped>
  .navbar {

    background: linear-gradient(90deg, rgba(89,97,100,1) 2%, rgba(134,143,150,1) 53%);
    padding: 10px 20px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
  }

  .navbar-brand {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
    transition: color
  }

  .logo {
    height: 40px;
    margin-right: 10px;
  }

  .navbar-toggler {
    border: none;
  }

  /* .navbar-toggler-icon {
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E");
  } */

  .nav-link {
    color: white;
    margin: 0 10px;
    transition: color 0.3s;
  }

  .nav-link:hover {
    color: #007bff;
  }

  .active-link {
    text-decoration: underline;
    font-weight: bold;
    text-underline-offset: 4px;
  }

  .nav-item .dropdown-menu {
    background-color: #f8f9fa;
    border: none;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    right: 0; /* Align dropdown to the right */
  }

  .dropdown-item {
    color: #000;
    transition: background-color 0.3s, color 0.3s;
  }

  .dropdown-item:hover {
    background-color: transparent;
    color: #000;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .cart-item-details {
    display: flex;
    flex-direction: column;
  }

  .quantity-controls {
    display: flex;
    align-items: center;
  }

  .quantity-button {
    background-color: #f8f9fa;
    border: 1px solid #ddd;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .quantity-button:hover {
    background-color: #e9ecef;
  }

  .quantity-display {
    min-width: 30px;
    text-align: center;
    padding: 5px 10px;
    margin: 0 5px;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .action-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  .remove-button,
  .checkout-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .remove-button {
    color: red;
  }

  .checkout-button {
    color: green;
  }

  @media (max-width: 992px) {
    .navbar-nav {
      text-align: center;
    }

    .nav-link {
      margin: 10px 0;
    }
  }
  </style>
