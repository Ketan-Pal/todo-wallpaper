const { Client } = require('@notionhq/client');
const notion = new Client({ auth: 'secret_1XaLaO71QQStjx1z6siJc9gsauYajY8lg5DATNV62uI' });

exports.getTodoTasks = async function() {
  
  const data = {
    "Personal": [],
    "Work": [],
    "Others": []
  };
  
  const response = await notion.databases.query({
    database_id: '11683f854c7f41a7ac187fd6e1528ae0',
    "filter": {
      "property": "Done",
      "checkbox": {
        "equals": false
      }
    },
    "sorts": [
        {
            "property": "Priority",
            "direction": "ascending"
        },
        {
            "timestamp": "created_time",
            "direction": "ascending"
        }
    ]
  });
  
  const results = response.results;

  for(var i = 0; i < results.length; i++) {
    const result = results[i];
    const category = result.properties["Tags"].select?.name || "Others";
    const task = result.properties["Name"].title[0].plain_text;

    data[category].push(task);
  }

  console.log(data);
  return data;
}