const {conversation} = require("@assistant/conversation");
const functions = require("firebase-functions");
const app = conversation();


const {Configuration, OpenAIApi} = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


const admin = require("firebase-admin");

// const serviceAccount = require("/Users/jwwei2/Desktop/Random Bot/"+
// "actpro-xypifv-firebase-adminsdk-fhkys-99ac9bbff9.json");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://pivotal-trail-350004.firebaseio.com",
});

const db = admin.firestore();
const openai = new OpenAIApi(configuration);
// const response = await openai.retrieveEngine("text-davinci-002");


// const admin = require("firebase-admin");
// const {user} = require("firebase-functions/lib/providers/auth");

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: "https://actpro-xypifv.firebaseio.com",
// });

app.handle("getResponse", (conv) => {
  // Implement your code here
//   food = conv.intent.params['food_entity'].original;
  conv.add("Hello");
});


app.handle("greeting_work", async (conv) => {
  const sessionID = conv.session.id.slice(-6, -1);
  // const docRef = db.collection("user").doc(session_ID);
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: "Write a friendly greeting in the question form."+
    " Example: how are you?\n",
    temperature: 0.85,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  conv.add(response.data.choices[0].text);
  const origin = {conv: "I'm a life coach. "+
  "I'm talking with a customer about her work yesterday. "+
  "I help her reflect on what she did great yesterday"+
  " her productivity "+
  "and whether she has any concerns. "+
  "Here's my conversation with the customer: \n"+
  "Customer: Hi, how are you doing?\n Me: How's your day so far?"};
  await db.collection("work").doc(sessionID).set(origin);
});

app.handle("greeting_sleep", async (conv) => {
  const sessionID = conv.session.id.slice(-6, -1);
  // const docRef = db.collection("user").doc(session_ID);
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: "Write a friendly greeting in the question form."+
    " Example: how are you?\n",
    temperature: 0.85,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  conv.add(response.data.choices[0].text);
  const origin = {conv: "I'm a sleep expert. "+
  "I'm checking in with a customer about her sleep time, "+
  "sleep latency, and sleep quality yesterday. "+
  "Here's my conversation with the customer: \n"+
  "Customer: Hi, how are you doing?\n Me: How's your day so far?"};
  await db.collection("sleep").doc(sessionID).set(origin);
});

app.handle("greeting_activity", async (conv) => {
  const sessionID = conv.session.id.slice(-6, -1);
  // const docRef = db.collection("user").doc(session_ID);
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: "Write a friendly greeting in the question form."+
    " Example: how are you?\n",
    temperature: 0.85,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  conv.add(response.data.choices[0].text);
  const origin = {conv: "I'm a fitness coach. "+
  "I'm checking in with a customer about her "+
  "workout and exercise yesterday. "+
  "Here's my conversation with the customer: \n"+
  "Customer: Hi, how are you doing?\n Me: How's your day so far?"};
  await db.collection("activity").doc(sessionID).set(origin);
});

app.handle("greeting_diet", async (conv) => {
  const sessionID = conv.session.id.slice(-6, -1);
  // const docRef = db.collection("user").doc(session_ID);
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: "Write a friendly greeting in the question form."+
    " Example: how are you?\n",
    temperature: 0.85,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  conv.add(response.data.choices[0].text);
  const origin = {conv: "I'm a dietitian. "+
  "I'm checking in with a customer and asking her about "+
  "1) her meals and snacks, 2) calorie intake, "+
  "and 3) her feelings after eating yesterday. "+
  "Here's my conversation with the customer: \n"+
  "Customer: Hi, how are you doing?\n Me: How's your day so far?"};
  await db.collection("diet").doc(sessionID).set(origin);
});

app.handle("conv_work", async (conv) => {
  // const docRef = db.collection("user");
  const sessionID = conv.session.id.slice(-6, -1);
  const any = conv.intent.query;
  const history = await db.collection("work").doc(sessionID).get();
  const curConvInput = history.data().conv.toString() + "\nCustomer: " +any+".";
  console.log(history.data().conv.toString());
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: curConvInput + "\nMe:",
    temperature: 0.98,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["Me:", "Customer:"],
  });
  console.log(curConvInput);
  // conv.add(any);
  const res = response.data.choices[0].text;
  conv.add(res);
  const nextConvHistory = {conv: curConvInput + "\nMe:" + res};
  await db.collection("work").doc(sessionID).update(nextConvHistory);
  // conv.add("Hi there! It's good to see you!");
});

app.handle("conv_sleep", async (conv) => {
  // const docRef = db.collection("user");
  const sessionID = conv.session.id.slice(-6, -1);
  const any = conv.intent.query;
  const history = await db.collection("sleep").doc(sessionID).get();
  const curConvInput = history.data().conv.toString() + "\nCustomer: " +any+".";
  console.log(history.data().conv.toString());
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: curConvInput + "\nMe:",
    temperature: 0.98,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["Me:", "Customer:"],
  });
  console.log(curConvInput);
  // conv.add(any);
  const res = response.data.choices[0].text;
  conv.add(res);
  const nextConvHistory = {conv: curConvInput + "\nMe:" + res};
  await db.collection("sleep").doc(sessionID).update(nextConvHistory);
  // conv.add("Hi there! It's good to see you!");
});

app.handle("conv_activity", async (conv) => {
  // const docRef = db.collection("user");
  const sessionID = conv.session.id.slice(-6, -1);
  const any = conv.intent.query;
  const history = await db.collection("activity").doc(sessionID).get();
  const curConvInput = history.data().conv.toString() + "\nCustomer: " +any+".";
  console.log(history.data().conv.toString());
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: curConvInput + "\nMe:",
    temperature: 0.98,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["Me:", "Customer:"],
  });
  console.log(curConvInput);
  // conv.add(any);
  const res = response.data.choices[0].text;
  conv.add(res);
  const nextConvHistory = {conv: curConvInput + "\nMe:" + res};
  await db.collection("activity").doc(sessionID).update(nextConvHistory);
  // conv.add("Hi there! It's good to see you!");
});

app.handle("conv_diet", async (conv) => {
  // const docRef = db.collection("user");
  const sessionID = conv.session.id.slice(-6, -1);
  const any = conv.intent.query;
  const history = await db.collection("diet").doc(sessionID).get();
  const curConvInput = history.data().conv.toString() + "\nCustomer: " +any+".";
  console.log(history.data().conv.toString());
  const response = await openai.createCompletion("text-davinci-002", {
    prompt: curConvInput + "\nMe:",
    temperature: 0.98,
    max_tokens: 150,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    stop: ["Me:", "Customer:"],
  });
  console.log(curConvInput);
  // conv.add(any);
  const res = response.data.choices[0].text;
  conv.add(res);
  const nextConvHistory = {conv: curConvInput + "\nMe:" + res};
  await db.collection("diet").doc(sessionID).update(nextConvHistory);
  // conv.add("Hi there! It's good to see you!");
});

exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
