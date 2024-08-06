<template>
    <div class="profile-container">
      <div class="profile-info">
        <h1>Profil Pengguna</h1>
        <h4>{{ userLogged.user }}</h4>
        <p>Email: {{ userLogged.email }}</p>
        <button @click="navigateToCreateItems" class="create-item-button">Tambah Barang</button>
      </div>
      <div class="user-items">
        <h2>Barang yang Dijual</h2>
        <ul>
          <li v-for="item in userItems" :key="item.id">
            <h5>{{ item.name }}</h5>
            <p>{{ item.description }}</p>
            <p>Category: {{ item.category }}</p>
            <p>Harga: Rp{{ item.price }}</p>
            <p>Stock: {{ item.countInStock }}</p>
          </li>
        </ul>
      </div>
    </div>
  </template>

  <script>
import axios from "axios";
export default {
	data() {
		return {
			userLogged: {
				user: "",
				email: "",
			},
			userItems: [],
		};
	},
	mounted() {
		this.fetchUserProfile();
		this.fetchUserItems();
	},
	methods: {
		async fetchUserProfile() {
			try {
				const userLogged = await axios.get(
					`${import.meta.env.VITE_BK_PORT}/user/current`,
					{
						withCredentials: true,
					},
				);

				this.userLogged.user = userLogged.data.current_user.user;
				this.userLogged.email = userLogged.data.current_user.email;
			} catch (error) {
				if (error.response.status === 401) {
					alert("Unauthorized access. Please log in");
					window.location.href = "/login";
				}
			}
		},
		async fetchUserItems() {
			const barangUser = await axios.get(
				`${import.meta.env.VITE_BK_PORT}/item/user-items`,
				{
					withCredentials: true,
				},
			);

			this.userItems = barangUser.data.items;
		},
		navigateToCreateItems() {
			this.$router.push("/create-items");
		},
	},
};
</script>

  <style scoped>
  .profile-container {
    display: flex;
    flex-direction: row;
    width: 100%; /* Full width */
    height: 100vh; /* Full height */
    padding: 20px;
    padding-top: 90px;
    background: linear-gradient(to bottom, #f0f0f0, #ccc); /* Light gray gradient */
    color: #333; /* Dark text for contrast */
    align-items: stretch; /* Ensure both sections stretch to the same height */
  }

  .profile-info {
    flex: 1;
    margin-right: 20px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff; /* White background for better readability */
    height: 100%; /* Ensure it stretches to full height */
  }

  .user-items {
    flex: 2;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #fff; /* White background for better readability */
    overflow-y: auto;
    height: 100%; /* Ensure it stretches to full height */
  }

  .user-items ul {
    list-style-type: none;
    padding: 0;
  }

  .user-items li {
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
  }

  .user-items h3 {
    margin: 0;
  }

  .user-items p {
    margin: 5px 0;
  }

  .create-item-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #007bff; /* Blue background */
    color: #fff; /* White text */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    align-self: flex-start; /* Align button to the start */
  }

  .create-item-button:hover {
    background-color: #0056b3; /* Darker blue on hover */
  }

  /* Media queries for responsiveness */
  @media (max-width: 768px) {
    .profile-container {
      flex-direction: column;
    }

    .profile-info {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
  </style>
