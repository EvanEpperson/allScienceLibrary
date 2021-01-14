const express = require('express');
const mongoose = require('mongoose');

const app = express();
require('dotenv').config();
const PORT = process.env.PORT
const MONGODB_URI