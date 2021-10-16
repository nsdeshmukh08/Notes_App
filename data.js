const data =  [{
  heading: 'HEading 1',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis iusto omnis id delectus a atque voluptas neque asperiores?',
  active: true,
  id:'1',
},
{
  heading: 'HEading 2',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis iusto omnis id delectus a atque voluptas neque asperiores?',
  active: false,
  id:'2',
},
{
  heading: 'HEading 3',
  description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis iusto omnis id delectus a atque voluptas neque asperiores?',
  active: false,
  id:'3',
},
{
  heading: 'HEading 4',
  description: 'lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis iusto omnis id delectus a atque voluptas neque asperiores?',
  active: false,
  id:'4',
}];

if(!localStorage.notes){
  localStorage.setItem('notes', JSON.stringify(data));
} 
