<template>
    <div class="login-register">
      <form @submit.prevent="register" method="post">
        <h3>Sign Up</h3>
        <label for="user">Nama:</label>
        <input type="text" v-model="userRegister.user" id="user" placeholder="Nama" required />
        <label for="password">Password:</label>
        <input type="password" v-model="userRegister.password" id="password" placeholder="Password" required />
        <label for="email">Email:</label>
        <input type="email" v-model="userRegister.email" id="email" placeholder="Email" required />
        <p class="jenck">
          Already have an account?
          <RouterLink class="jnck" to="/login">Sign in</RouterLink>
        </p>
        <button type="submit">Register</button>
      </form>
    </div>
  </template>

  <script>
import axios from "axios";

export default {
	data() {
		return {
			userRegister: {
				user: "",
				password: "",
				email: "",
			},
		};
	},
	methods: {
		async register() {
			try {
				const register = await axios.post(
					`${import.meta.env.VITE_BK_PORT}/user/register`,
					this.userRegister,
				);

				const isiData = register.data;
				if (isiData) {
					alert(`${isiData.message}`);
				}

				window.location.href = "/login";
			} catch (error) {
				if (error.response.data.message === "Semua data harus diisi") {
					alert("Semua data harus diisi");
				} else if (error.response.data.message === "Email sudah terdaftar") {
					alert("Email sudah terdaftar");
				} else if (error.response.data.message === "User sudah terdaftar") {
					alert("Nama sudah terdaftar");
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
  .login-register {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 80vh;
    padding: 20px;
    margin-top: 80px;
    box-sizing: border-box;
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
    width: 100%;
    box-sizing: border-box;
  }

  button {
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: white;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
    box-sizing: border-box;
  }

  button:hover {
    background-color: #0056b3;
  }

  .jenck {
    text-align: left;
  }

  .jnck {
    color: #007bff;
    text-decoration: none;
  }

  .jnck:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    .login-register {
        margin-top: 80px;
      padding: 10px;
    }

    form {
      padding: 15px;
    }

    button {
      padding: 8px;
    }
  }
  </style>
