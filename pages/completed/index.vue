<template>
    <v-container>
        <div class="my-4 text-end">
            <!-- <v-btn @click = "handleCreate" class="bg-cyan text-white">Create</v-btn> -->

        </div>
      <v-data-table
        :headers="headers"
        :items=" subscriptions"
        item-value="id"
      >

        <template v-slot:item.status="{ item }">
       
        <div  class="text-sm bg-green rounded-xl mx-auto text-center">{{ item.status }}</div>

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
        text="Confirm After payment User"
        title="Confirm Payment?"
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
  // Table headers
  const headers = ref([
    { title: 'Transaction Id', key: 'id' },
    { title: 'UserId', key: 'user_id' },
    { title: 'Status',  value: "status", key: 'status' },
    { title: 'Amount',   key: 'amount' },
    { title: 'Transaction Date', key: 'transaction_date' },
  ]);
  



 // Bearer token (this could be stored in localStorage or Vuex)
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTczNzY2MTI2NSwiZXhwIjoxNzM3NjY0ODY1fQ.LeDfR8kY30ojAro1-BykqosPZK5y8WakPFpkgOnOkB4';

// Fetch data on component mount
const fetchSubscriptions = async () => {
  try {
    const response = await fetch('https://llmbackend-production.up.railway.app/completed-payments', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    
    const data = await response.json();
    console.log('ddddddddd', data.completedPayments )
    subscriptions.value = data.completedPayments;
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
    const payload =  {status:"approved"}
    const response = await fetch(`https://llmbackend-production.up.railway.app/transaction/approve/${activateId.value}/`, {
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
  