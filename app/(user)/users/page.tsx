'use client'
import React, {useState, useEffect, use} from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Props = {}

const UsersPage = (props: Props) => {

  const {data: session, status} = useSession();
  const [users, setUsers] = useState<{ id: string; name: string; username: string; email: string }[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = () => { 
    if(searchTerm.trim() === '') return users;
    return users.filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase())); 
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/log-in');
    }
  }, [status, router]);

  if(status === 'loading'){
    return <p className='loading_text'>Loading...</p>
  }

  return (
    <div className='users_container'>
      <h1 className='users_page_header'>Users Page</h1>
      <div className='search_bar_users'>
        <input type="text" placeholder='Search users...' className='search_input_users' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      </div>
      <div className='users_count'>
        {filteredUsers().length} {filteredUsers().length === 1 ? 'user' : 'users'} found
      </div>
      <div className='users_table_container'>
        {filteredUsers().map((user) => (
          <div key={user.id} className='user_link'>
            <Link href={`/profile/${user.username}`} className='user_link_text'>
              {user.username}
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UsersPage