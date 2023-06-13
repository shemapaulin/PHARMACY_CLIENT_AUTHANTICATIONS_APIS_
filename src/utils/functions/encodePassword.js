import bcrypt from "bcrypt";

const saltRounds = 10;

export const encode = async (password) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password with the generated salt
    const hashedPassword = await bcrypt.hash(password, salt);
    
    return hashedPassword;
  } catch (error) {
    console.error(error);
  }
};

export const getPurePassword =async(password,hashedPassword)=>{

  try{

    let matched= await bcrypt.compare(password,hashedPassword);
      if(!matched)
       {
      return console.log("something went wrong while decoding password");
      }
      else {
        return password;
      }
    }
  
  
  
  catch(error){
    console.log(error);
  }
}




  






