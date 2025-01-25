<template>
    <v-form v-model="valid" @submit.prevent="handleSubmit()">

        <v-container class="m-8">
            <h1 class="text-xl">Pacakges</h1>
            <v-row class="mt-8">

                <v-col cols="12" md="4">
                    <v-text-field v-model="name" :counter="10" :rules="nameRules" label="Name" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="price" :counter="10" :rules="nameRules" label="Price"
                        required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="income" :counter="10" :rules="nameRules" label="Daily income"
                        required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-text-field v-model="description" :counter="10" :rules="nameRules" label="Description"
                        required></v-text-field>
                </v-col>
            </v-row>
            <v-btn @click="$router.back()" class="!text-end bg-orange mr-2 text-white" type="submit" :loading="loading">
            Back
        </v-btn>

            <v-btn v-if="can_edit" class="!text-end bg-cyan text-white" type="submit" :loading="loading">
            Update
        </v-btn>
        <v-btn v-else class="!text-end bg-cyan text-white" type="submit" :loading="loading">
            Create
        </v-btn>
 
        </v-container>



    </v-form>
</template>
<script setup>
import { ref } from 'vue'
const router = useRouter();
const loading = ref(false)
const route = useRoute();
const valid = ref(false)
const name = ref('')
const price = ref('')
const income = ref('')
const description = ref('')

const nameRules = [
    value => {
        if (value) return true
        return 'Name is required.'
    },
]


onMounted(async ()=>{
    if (route.query.id) {
        try {
            loading.value = true;
            const response = await fetch(`https://llmbackend-production.up.railway.app/subscription/${route.query.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
            name.value = data.subscription.plan_name
            price.value = data.subscription.price
            income.value = data.subscription.daily_income
            description.value = data.subscription.description
            loading.value = false;

        } catch (error) {
            console.error('Error fetching subscriptions:', error);
            loading.value = false;
        }
    }
})

const handleSubmit = async () =>{
    if (route.query.id) {
    const payload = { 
    id : route.query.id,
    plan_name: name.value,
    price: price.value,
    description: description.value,
    daily_income: parseInt(income.value, 10)
  }

    try{
        loading.value = true

      const response = await fetch('https://llmbackend-production.up.railway.app/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)

    });

    router.push('/packages')

    loading.value = false

    }
    catch{
        loading.value = false
    }
    }
    else{

        const payload = { 
    plan_name: name.value,
    price: price.value,
    description: description.value,
    daily_income: parseInt(income.value, 10)
  }

    try{
        loading.value = true

      const response = await fetch('https://llmbackend-production.up.railway.app/subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)

    });

    router.push('/packages')

    loading.value = false

    }
    catch{
        loading.value = false
    }

    }
   

} 


const can_edit = computed(() => !!route.query.id);


</script>
