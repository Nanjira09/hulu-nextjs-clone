import {BadgeCheckIcon, CollectionIcon, HomeIcon,
    LightningBoltIcon, SearchIcon, UserIcon,} from '@heroicons/react/outline';
import Image from 'next/image';
import HeadItem from './HeadItem';

const Header = () => {
    return (
        <header className="flex flex-col sm:flex-row m-5 justify-between items-center h-auto">
            <div className="flex flex-grow justify-evenly max-w-2xl">
                <HeadItem title='HOME' Icon={HomeIcon}/>
                <HeadItem title='TRENDING' Icon={LightningBoltIcon}/>
                <HeadItem title='VERIFIED' Icon={BadgeCheckIcon}/>
                <HeadItem title='COLLECTIONS' Icon={CollectionIcon}/>
                <HeadItem title='SEARCH' Icon={SearchIcon}/>
                <HeadItem title='ACCOUNT' Icon={UserIcon}/>
            </div>
            <Image src="https://links.papareact.com/ua6" width={200} height={100} className="object-contain"/>
        </header>
    );
}
 
export default Header;