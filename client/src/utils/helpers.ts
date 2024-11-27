function extractJsonFromString(error:any) {
    const errorMessage = error.toString();
  
    const regex = /{.*?}/;
  
    const found = errorMessage.match(regex);
  
    if (found && found[0]) {
      try {
        return JSON.parse(found[0]);
      } catch (parseError) {
       
        return null;
      }
    } else {
  
      return null;
    }
  }