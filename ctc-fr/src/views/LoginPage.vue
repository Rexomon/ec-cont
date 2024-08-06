<template>
  <div class="login-register">
    <form @submit.prevent="login" method="post">
      <h3>Sign In</h3>
      <label for="user">Nama:</label>
      <input type="text" v-model="userLogin.user" id="user" placeholder="Nama" required />
      <label for="password">Password:</label>
      <input type="password" v-model="userLogin.password" id="password" placeholder="Password" required />
      <p class="jenck">
        Don't have an account?
        <RouterLink class="jnck" to="/register">Sign Up</RouterLink>
      </p>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			userLogin: {
				user: "",
				password: "",
			},
		};
	},
	methods: {
		async login() {
			try {
				const response = await axios.post(
					`${import.meta.env.VITE_BK_PORT}/user/login`,
					this.userLogin,
					{
						withCredentials: true,
					},
				);
				const data = response.data;

				if (data.pesan === "Sukses") {
					alert("Login successful");
					window.location.href = "/";
				}
			} catch (error) {
				if (error.response.data.message === "Username atau Password salah") {
					alert("Username atau Password salah");
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
  margin-top: 70px;
  padding: 20px;
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

@media (max-width: 800px) {
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
