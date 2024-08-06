<template>
    <div class="update-form">
      <form @submit.prevent="updateContact" method="post">
        <h3>Update Contact</h3>
        <label for="user">Nama:</label>
        <input type="text" v-model="updateIsiContact.name" id="user" placeholder="Nama" required />
        <label for="email">Email:</label>
        <input type="email" v-model="updateIsiContact.email" id="email" placeholder="Email" required />
        <label for="phone">Phone:</label>
        <input type="phone" v-model="updateIsiContact.phone" id="phone" placeholder="Phone" required />
        <button type="submit">Update</button>
      </form>
    </div>
  </template>

  <script type="module">
import axios from "axios";

export default {
	data() {
		return {
			updateIsiContact: {
				name: "",
				email: "",
				phone: "",
			},
		};
	},
	mounted() {
		this.contactData();
	},

	methods: {
		contactData() {
			const data = localStorage.getItem("idContact");
			const ambilData = JSON.parse(data);

			this.updateIsiContact.name = ambilData.name;
			this.updateIsiContact.email = ambilData.email;
			this.updateIsiContact.phone = ambilData.phone;
		},
		async updateContact() {
			try {
				const dataAwal = localStorage.getItem("idContact");
				const ambilData = JSON.parse(dataAwal);

				await axios.put(
					`${import.meta.env.VITE_BK_PORT}/contact/${ambilData._id}`,
					this.updateIsiContact,
					{
						withCredentials: true,
					},
				);
				alert("Contact updated successfully");
				this.$router.push({ path: "/contacts" });
			} catch (error) {
				if (
					error.response.data.message === "Token invalid" ||
					error.response.data.message === "Token not found"
				) {
					alert("Unauthorized");
					window.location.href = "/login";
				} else {
					console.error("Error:", error);
					alert("An error occurred. Please try again.");
				}
			}
		},
	},
};
</script>

  <style scoped>
  .update-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    margin-top: 70px;
  }

  form {

    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    box-sizing: border-box;
  }

  label {
    margin-bottom: 5px;
  }

  input {
    margin-bottom: 15px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  /* Media queries for responsive design */
  @media (max-width: 600px) {
    form {
        margin-top: 50px;
        padding: 15px;
        width: 90%;
    }

    label {
        font-size: 14px;
    }

    input {
        padding: 10px;
    }

    button {
        padding: 12px;
        font-size: 14px;
    }
  }

    @media (min-width: 600px) and (max-width: 1200px) {
    form {
        margin-top: 50px;
        padding: 20px;
        width: 80%;
    }

    label {
        font-size: 16px;
    }

    input {
        padding: 12px;
    }

    button {
        padding: 14px;
        font-size: 16px;
    }
    }
    </style>
