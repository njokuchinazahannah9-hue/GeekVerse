function RecentUsers() {

  const users = [

    {
      name: "john.doe@email.com",
      date: "Joined Jul 17, 2026",
    },

    {
      name: "sarah.wilson@email.com",
      date: "Joined Jul 17, 2026",
    },

    {
      name: "anime.lover@email.com",
      date: "Joined Jul 16, 2026",
    },

    {
      name: "manga.fan@email.com",
      date: "Joined Jul 16, 2026",
    },

    {
      name: "comic.reader@email.com",
      date: "Joined Jul 15, 2026",
    },

  ];

  return (

    <div className="recent-users">

      <div className="table-header">

        <h3>Recent Users</h3>

        <span>View All</span>

      </div>

      {

        users.map((user,index)=>(

          <div
            className="user-item"
            key={index}
          >

            <img
              src={`https://i.pravatar.cc/100?img=${index+20}`}
              alt=""
            />

            <div>

              <h4>{user.name}</h4>

              <span>{user.date}</span>

            </div>

          </div>

        ))

      }

    </div>

  );

}

export default RecentUsers;