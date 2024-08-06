<template>
    <div class="container">
        <h2>Contact</h2>
        <div class="header">
            <button @click="showAddContactForm">Tambah Kontak</button>
        </div>
        <div class="table-container">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="contact in contacts" :key="contact._id">
                        <td>{{ contact.name }}</td>
                        <td>{{ contact.email }}</td>
                        <td>{{ contact.phone }}</td>
                        <td>
                            <div class="form-a">
                                <button @click="deleteContact(contact._id)">Delete</button>
                                <button @click="updateContact(contact)">Update</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="showForm" class="form-container">
            <div class="addcontact">
                <form class="isiaddcontact" @submit.prevent="addContact">
                    <label for="name">Name:</label>
                    <input type="text" v-model="newContact.name" placeholder="Name" required>

                    <label for="email">Email:</label>
                    <input type="email" v-model="newContact.email" placeholder="Email" required>

                    <label for="phone">Phone:</label>
                    <input type="text" v-model="newContact.phone" placeholder="Phone" required>

                    <button type="submit">Add Contact</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			contacts: [],
			showForm: false,
			newContact: {
				name: "",
				email: "",
				phone: "",
			},
		};
	},
	mounted() {
		this.getContacts();
	},
	methods: {
		async getContacts() {
			try {
				const response = await axios.get(`${import.meta.env.VITE_BK_PORT}/contact/`, {
					withCredentials: true,
				});

				const isiData = response.data.isiContact;
				this.contacts = isiData;
			} catch (error) {
				if (error.response.status === 401) {
					alert("Unauthorized access. Please log in");
					this.$router.push({ path: "/login" });
				} else {
					console.error(error);
				}
			}
		},

		async deleteContact(id) {
			try {
				await axios.delete(`${import.meta.env.VITE_BK_PORT}/contact/${id}`, {
					withCredentials: true,
				});

				this.getContacts();
			} catch (error) {
				if (error.response.status === 401) {
					alert("Unauthorized access. Please log in");
					this.$router.push({ path: "/login" });
				} else {
					console.error(error);
				}
			}
		},

		async updateContact(data) {
			try {
				localStorage.setItem("idContact", JSON.stringify(data));

				this.$router.push({ path: "/update-contacts" });
			} catch (error) {
				if (error.response.status === 401) {
					alert("Unauthorized access. Please log in");
					this.$router.push({ path: "/login" });
				} else {
					console.error(error);
				}
			}
		},

		showAddContactForm() {
			this.showForm = !this.showForm;
		},

		async addContact() {
			try {
				await axios.post(`${import.meta.env.VITE_BK_PORT}/contact`, this.newContact, {
					withCredentials: true,
				});

				this.getContacts();
				this.showForm = false;
			} catch (error) {
				if (error.response.status === 401) {
					alert("Unauthorized access. Please log in");
					window.location.href = "/login";
				} else {
					console.error(error);
				}
			}
		},
	},
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 100px;
    padding: 0 20px;
    box-sizing: border-box;
}

h2 {
    margin-bottom: 20px;
    text-align: center;
}

.header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    max-width: 800px;
    margin-bottom: 20px;
}

.header button {
    padding: 10px;
    border: none;
    background-color: #28a745;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.header button:hover {
    background-color: #218838;
}

.table-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    overflow-x: auto;
}

.table {
    width: 100%;
    max-width: 800px;
    border-collapse: collapse;
    text-align: center;
}

thead th, tbody td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
}

thead {
    background-color: #f2f2f2;
}

.form-a {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.form-a button {
    margin-left: 10px;
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

.form-container {
    margin-top: 20px;
    width: 100%;
    max-width: 800px;
}

form {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

button[type="submit"] {
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

button[type="submit"]:hover {
    background-color: #0056b3;
}

@media (max-width: 600px) {
    .header {
        width: 100%;
        justify-content: center;
    }

    .table-container {
        padding: 0 10px;
    }

    .form-container {
        width: 100%;
        padding: 0 10px;
    }

    .table {
        display: block;
    }

    thead, tbody, th, td, tr {
        display: block;
    }

    thead tr {
        position: absolute;
        top: -9999px;
        left: -9999px;
    }

    tr {
        border: 1px solid #ccc;
        margin-bottom: 10px;
    }

    td {
        border: none;
        border-bottom: 1px solid #eee;
        position: relative;
        padding-left: 50%;
        text-align: left;
    }

    td:before {
        position: absolute;
        top: 50%;
        left: 10px;
        width: 45%;
        padding-right: 10px;
        white-space: nowrap;
        transform: translateY(-50%);
        content: attr(data-label);
        font-weight: bold;
    }

    .table {
        font-size: 14px;
    }

    button, button[type="submit"] {
        padding: 8px;
    }
}
</style>
