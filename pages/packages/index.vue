<template>
    <v-container>
        <div class="my-4 text-end">
            <v-btn @click = "handleCreate" class="bg-cyan text-white">Create</v-btn>

        </div>
      <v-data-table
        :headers="headers"
        :items=" subscriptions"
        item-value="id"
      >
        <!-- Slot for custom actions -->
        <template v-slot:item.action="{ item }">
       
            <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    
       
            <v-icon @click="handleDelete(item)" class="text-red">mdi-delete</v-icon>
          
        </template>
      </v-data-table>

<!-- delete dialog -->
      <v-dialog
      v-model="dialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="You Can not Revert It again"
        title="Confirm Delete?"
      >
        <template v-slot:actions>
          <v-btn
            class="bg-cyan text-white"
            text="Cancel"
            @click="dialog = false"
          ></v-btn>
          <v-btn @click = "confirmDelete" class="!text-end bg-orange text-white" :loading="loading">
            Confirm
        </v-btn>
        </template>
      </v-card>
    </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  const subscriptions = ref([]);
  const loading = ref(false)
  const dialog = ref(false)
  const router = useRouter();
  const deleteId = ref("")
  // Table headers
  const headers = ref([
    { title: 'Name', key: 'plan_name' },
    { title: 'Price', key: 'price' },
    { title: 'Daily Income', key: 'daily_income' },
    { title: "Action", value: "action", key: "action", sortable: false },// Custom column for actions
  ]);
  
  // Table data
  const items = ref([
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ]);


 // Bearer token (this could be stored in localStorage or Vuex)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTczNzY2MTI2NSwiZXhwIjoxNzM3NjY0ODY1fQ.LeDfR8kY30ojAro1-BykqosPZK5y8WakPFpkgOnOkB4';

// Fetch data on component mount
const fetchSubscriptions = async () => {
  try {
    const response = await fetch('https://llmbackend-production.up.railway.app/subscriptions', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    subscriptions.value = data.subscriptions;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
  }
};

// View details
const viewSubscription = (item) => {
  console.log('Viewing subscription:', item);
};

const handleCreate =()=>{
    router.push('packages/entry')
}

const handleDelete   = async(data)=>{
   deleteId.value = data.id
   dialog.value = true
}
const confirmDelete = async () =>{

    try {
    loading.value = true;
    const response = await fetch(`https://llmbackend-production.up.railway.app/subscription/${deleteId.value}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    loading.value = false;
    dialog.value = false;
    fetchSubscriptions()
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    loading.value = false;
  }
  
}

// Fetch data when the component is mounted
onMounted(fetchSubscriptions);
  
  // Action methods
  const editItem = (item) => {
    console.log('Edit:', item);
    router.push(`/packages/entry/?id=${item.id}`)
  };
  
  const viewItem = (item) => {
    console.log('View:', item);
  };
  </script>
  
  <style scoped>
  /* Optional: Customize button spacing or styles */
  </style>
  