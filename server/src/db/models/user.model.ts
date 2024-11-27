import { options } from "sanitize-html";
import { UUID } from "sequelize";
import { DataTypes, Model, Optional, UUIDV4 } from "sequelize";

interface UserAttributes {
  userId: number;
  name: string;
  email: string;
  otp_secrete?: string;
  password: string;
  is_verified: boolean;
  role: number;
  refresh_token: string[];

}

interface UserCreationAttributes extends Optional<UserAttributes, "userId"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  userId: number;
  is_verified: boolean;
  name: string;
  email: string;
  password: string;
  role: number;
  otp_secrete: string;
  refresh_token: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const UserSchema = {
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  otp_secrete: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refresh_token: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM("1001", "1002"),
    defaultValue: "1001",
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
};
//   {
//     sequelize,
//     tableName: 'Users',
//   }
// );

export { User, UserSchema };
