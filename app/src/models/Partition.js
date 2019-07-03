import { getPartitionInfo } from "../api/api";

class Partition {
  constructor(data = {}) {
    this.data = data;
  }

  getPartitionInfo({ name, cb }) {
    getPartitionInfo(name)
      .then(res => {
        cb(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export default Partition;
