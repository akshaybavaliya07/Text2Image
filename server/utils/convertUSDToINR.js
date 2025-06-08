export const convertUSDToINR = async (amount) => {
  try {
    const res = await fetch(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/USD/INR/${amount}`
    );

    const data = await res.json();

    if (data.result === "success") {
      return data.conversion_result;
    } else {
      return amount * 90;
    }
  } catch (error) {
    return amount * 90;
  }
};
