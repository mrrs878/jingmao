let Partition = require('../models/Partition')

const PARTITION = {
  getPartitionByName(name) {
    return Partition.findOne({ name })
  }
}

module.exports = PARTITION