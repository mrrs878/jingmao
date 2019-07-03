import User from "../models/User";
import Book from "../models/Book";
import SecKill from "../models/SecKill";
import Partition from "../models/Partition";

export default {
  user: new User(),
  book: new Book(),
  secKill: new SecKill(),
  partition: new Partition()
};
