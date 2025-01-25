<template>
    <v-container>
        <div class="my-4 text-end">
            <!-- <v-btn @click = "handleCreate" class="bg-cyan text-white">Create</v-btn> -->
            <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
      ></v-text-field>
        </div>
      <v-data-table
        :headers="headers"
        :items=" subscriptions"
         :search="search"
        item-value="id"
      >
        <!-- Slot for custom actions -->
        <template v-slot:item.action="{ item }">
       
            <v-icon class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
    
       
            <v-icon @click="handleDelete(item)" class="text-red">mdi-delete</v-icon>
          
        </template>
        <template v-slot:item.status="{ item }">
       
        <div v-if="item.status == 'active'" class="text-sm bg-green rounded-xl">ACTIVE</div>
        <div v-else class="text-sm bg-orange text-white rounded-xl">INACTIVE</div>


     
   </template>
      </v-data-table>

<!-- delete dialog -->
      <v-dialog
      v-model="confirmDialog"
      width="auto"
    >
      <v-card
        max-width="400"
        prepend-icon="mdi-update"
        text="You Can Active After Payment Confirmation"
        title="Active User?"
      >
        <template v-slot:actions>
          <v-btn
            class="bg-cyan text-white"
            text="Cancel"
            @click="confirmDialog = false"
          ></v-btn>
          <v-btn @click = "confirmActive" class="!text-end bg-orange text-white" :loading="loading">
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
  const confirmDialog = ref(false)
  const router = useRouter();
  const deleteId = ref("")
  const activateId = ref('')
  const search = ref('')
  const apiBase = useRuntimeConfig().public.apiBase;
  // Table headers
  const headers = ref([
    { title: 'Id', key: 'id' },
    { title: 'Name', key: 'name' },
    { title: 'Status',  value: "status", key: 'status' },
    { title: 'Plan Name', key: 'plan_name' },
    { title: 'Phone Number', key: 'phone_number' },
    { title: 'Active Referral', key: 'active_referral' },
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
    const response = await fetch('https://llmbackend-production.up.railway.app/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    subscriptions.value = data.users;
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
const confirmActive = async () =>{

    try {
    loading.value = true;
    const payload =  {status:"active"}
    const response = await fetch(`https://llmbackend-production.up.railway.app/user/${activateId.value}/status`, {
      method: 'PATCH',
      headers: {
        // 'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body:JSON.stringify(payload)
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    loading.value = false;
    confirmDialog.value = false;
    fetchSubscriptions()
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    loading.value = false;
  }
  
}

// Fetch data when the component is mounted
onMounted(fetchSubscriptions);
  console.log('url',apiBase)
  // Action methods
  const editItem = (item) => {
    activateId.value = item.id
    confirmDialog.value = true;

    // router.push(`/packages/entry/?id=${item.id}`)
  };
  
  const viewItem = (item) => {
    console.log('View:', item);
  };
  </script>
  
  <style scoped>
  /* Optional: Customize button spacing or styles */
  </style>
  