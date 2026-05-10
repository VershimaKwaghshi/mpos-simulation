const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event) => {
  // Connects using the keys you saved in Netlify
  const supabase = createClient(process.env.SB_URL, process.env.SB_SECRET);
  const { amountNGN } = JSON.parse(event.body);
  
  const rate = 2050; 
  const gbpAmount = amountNGN / rate;
  const buffer = gbpAmount * 0.002; 

  // Updates your Supabase Ledger
  const { error } = await supabase
    .from('agents')
    .update({ ledger_balance: 24500000.00 - amountNGN })
    .eq('agent_code', 'NG-004');

  return {
    statusCode: error ? 400 : 200,
    body: JSON.stringify({ success: !error, ref: `MPOS-${Date.now()}` })
  };
};
