<template>
    <div class="add-item-form-container">
        <div class="add-item-form">
            <h1>Tambah Barang</h1>
            <form @submit.prevent="createItems">
                <div class="form-group">
                    <label for="name">Nama Barang</label>
                    <input type="text" id="name" v-model="item.name" />
                </div>
                <div class="form-group">
                    <label for="price">Harga</label>
                    <input type="number" id="price" v-model="item.price" />
                </div>
                <div class="form-group">
                    <label for="category">Kategori</label>
                    <input type="text" id="category" v-model="item.category" />
                </div>
                <div class="form-group">
                    <label for="countInStock">Jumlah Stok</label>
                    <input type="number" id="countInStock" v-model="item.countInStock" />
                </div>
                <div class="form-group">
                    <label for="description">Deskripsi</label>
                    <textarea id="description" v-model="item.description"></textarea>
                </div>
                <button type="submit" class="btn btn-primary">Tambah Barang</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
	data() {
		return {
			item: {
				name: "",
				price: 0,
				category: "",
				countInStock: 0,
				description: "",
			},
		};
	},
	methods: {
		async createItems() {
			try {
				await axios.post(
					`${import.meta.env.VITE_BK_PORT}/create-items`,
					this.item,
					{
						withCredentials: true,
					},
				);
				this.$router.push({ path: "/" });
			} catch (error) {
				if (error.response.status === 400) {
					alert("Semua data harus terisi");
				}
				if (
					error.response.data.message === "Token invalid" ||
					error.response.data.message === "Token not found"
				) {
					alert("Anda harus login terlebih dahulu");
					this.$router.push({ path: "/login" });
				}
			}
		},
	},
};
</script>

<style>
.add-item-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f2f5;
    padding: 20px;
    box-sizing: border-box;
    padding-top: 60px; /* Tambahkan padding-top untuk menghindari navbar */
}

.add-item-form {
    width: 100%;
    max-width: 500px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.add-item-form h1 {
    text-align: center;
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
}

.form-group textarea {
    resize: vertical;
}

.btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

/* Media query untuk resolusi kecil */
@media (max-width: 768px) {
    .add-item-form-container {
        padding-top: 100px; /* Tambahkan padding-top lebih besar untuk resolusi kecil */
    }
}

@media (max-width: 600px) {
    .add-item-form {
        padding: 15px;
        border: none;
        box-shadow: none;
    }

    .add-item-form h1 {
        font-size: 20px;
    }

    .form-group input,
    .form-group textarea {
        padding: 8px;
        font-size: 14px;
    }

    .btn {
        padding: 8px;
        font-size: 14px;
    }
}
</style>
