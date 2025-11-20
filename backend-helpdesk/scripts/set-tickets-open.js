require('dotenv').config();
const mongoose = require('mongoose');
const Ticket = require('../models/Ticket');

async function setAllTicketsToOpen() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdeskdb';
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');

  try {
    // Mettre à jour tous les tickets existants au statut "Open"
    const result = await Ticket.updateMany(
      {}, // Tous les tickets
      { 
        $set: { status: 'Open' },
        $push: {
          statusHistory: {
            status: 'Open',
            changedBy: 'System',
            changedAt: new Date(),
            comment: 'All tickets set to Open status'
          }
        }
      }
    );

    console.log(`✅ ${result.modifiedCount} tickets mis à jour au statut "Open"`);

    // Afficher le résumé des statuts
    const stats = await Ticket.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    console.log('📊 Résumé des statuts des tickets :');
    stats.forEach(stat => {
      console.log(`   ${stat._id}: ${stat.count} tickets`);
    });

  } catch (err) {
    console.error('❌ Erreur lors de la mise à jour:', err);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

setAllTicketsToOpen();
