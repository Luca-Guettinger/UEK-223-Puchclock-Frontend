import {Category} from './Category';
import {User} from './User';
import {Location} from './Location';

export class Entry {
  public id: number;
  public checkIn: Date;
  public checkOut: Date;
  public category: Category;
  public user: User;
  public location: Location;
}
