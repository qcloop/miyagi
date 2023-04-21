import {Fragment, useState} from 'react';
import cn from 'classnames';
import {Dialog} from '@/components/ui/dialog';
import {Transition} from '@/components/ui/transition';
import Button from '@/components/ui/button';
import {RadioGroup} from '@/components/ui/radio-group';
import Scrollbar from '@/components/ui/scrollbar';
import {Close} from '@/components/icons/close';
import {useLayout} from '@/lib/hooks/use-layout';
import {LAYOUT_OPTIONS} from '@/lib/constants';
import MicrosoftSignInBtn from '@/assets/images/ms-symbollockup_signin_dark.svg';
import Image from "@/components/ui/image";
import {Listbox} from '@/components/ui/listbox';
import HorizontalThreeDots from '@/components/icons/horizontal-three-dots';
import {ChevronDownIcon} from "@heroicons/react/24/outline";
import {usePersonalizeDrawer} from "@/components/personalize/personalize-context";


// Component: SwitcherButton
interface SwitcherButtonProps {
  checked: boolean;
  title: string;
}
function SwitcherButton({
  checked,
  title,
  children,
}: React.PropsWithChildren<SwitcherButtonProps>) {
  return (
    <div className="group cursor-pointer">
      <span
        className={cn(
          'flex h-[70px] items-center justify-center rounded-lg text-center text-sm font-medium uppercase tracking-wide transition-all',
          checked
            ? 'bg-white shadow-large dark:bg-gray-600'
            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-gray-700'
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'mt-3 block text-center text-sm transition-all',
          checked
            ? 'text-brand dark:text-white'
            : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
        )}
      >
        {title}
      </span>
    </div>
  );
}

const subreddits = [
    { id: 1, name: 'personalfinance' },
    { id: 2, name: 'financialplanning' },
    { id: 3, name: 'retirement' },
    { id: 4, name: 'economics' },
    { id: 5, name: 'frugal' },
];

interface SubRedditListProp {
    id: number;
    name: string;
}

export function SubRedditList({
                             sortData,
                             className,
                         }: {
    sortData: SubRedditListProp[];
    className?: string;
}) {
    const { layout } = useLayout();
    const [selectedItem, setSelectedItem] = useState(sortData[0]);
    return (
        <div className="relative w-full lg:w-auto">
            <Listbox value={selectedItem} onChange={setSelectedItem}>
                {layout === LAYOUT_OPTIONS.RETRO ? (
                    <>
                        <Listbox.Button className="hidden h-11 w-full items-center justify-between rounded-lg pr-2 text-sm text-gray-900 dark:text-white lg:flex xl:flex 3xl:hidden">
                            <HorizontalThreeDots />
                        </Listbox.Button>
                        <Listbox.Button
                            className={cn(
                                'flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white lg:hidden lg:w-40 xl:hidden xl:w-48 3xl:flex',
                                className
                            )}
                        >
                            {selectedItem.name} <ChevronDownIcon />
                        </Listbox.Button>
                    </>
                ) : (
                    <Listbox.Button
                        className={cn(
                            'flex h-11 w-full items-center justify-between gap-1 rounded-lg bg-gray-100 px-3 text-sm text-gray-900 dark:bg-gray-800 dark:text-white md:w-36 lg:w-40 xl:w-48',
                            className
                        )}
                    >
                        {selectedItem.name}
                        <ChevronDownIcon />
                    </Listbox.Button>
                )}
                <Transition
                    as={Fragment}
                    enter="ease-out duration-200"
                    enterFrom="opacity-0 translate-y-2"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 -translate-y-0"
                    leaveTo="opacity-0 translate-y-2"
                >
                    <Listbox.Options className="absolute z-20 mt-2 w-full min-w-[150px] origin-top-right rounded-lg bg-white p-3 px-1.5 shadow-large shadow-gray-400/10 ltr:right-0 rtl:left-0 dark:bg-[rgba(0,0,0,0.5)] dark:shadow-gray-900 dark:backdrop-blur">
                        {sortData.map((item) => (
                            <Listbox.Option key={item.id} value={item}>
                                {({ selected }) => (
                                    <div
                                        className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
                                            selected
                                                ? 'my-1 bg-gray-100 dark:bg-gray-700'
                                                : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                    >
                                        {item.name}
                                    </div>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </Listbox>
        </div>
    );
}

// Component: B2CLogin
function B2CLogin() {

  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Login to fetch MS Graph
      </h4>
          <Image src={MicrosoftSignInBtn} alt="Login with Microsoft AAD B2C" width={200} />
    </div>
  );
}

// Component: SubRedditSelector
function SubRedditSelector() {

  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Favorite Sub-reddit
      </h4>
      r/<SubRedditList sortData={subreddits} />
    </div>
  );
}

// Component: LinkAccounts

export function AccountsList() {
    let [account, setAccount] = useState('banks');
    return (
        <RadioGroup
            value={account}
            onChange={setAccount}
            className="grid grid-cols-2 gap-2 p-5"
        >
            <RadioGroup.Option value="banks">
                {({ checked }) => (
                    <span
                        className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
                            checked
                                ? 'border-brand bg-brand text-white shadow-button'
                                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        }`}
                    >
            Banks
          </span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="brokerage">
                {({ checked }) => (
                    <span
                        className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
                            checked
                                ? 'border-brand bg-brand text-white shadow-button'
                                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        }`}
                    >
            Brokerage
          </span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="expenses">
                {({ checked }) => (
                    <span
                        className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
                            checked
                                ? 'border-brand bg-brand text-white shadow-button'
                                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        }`}
                    >
            Expenses
          </span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option value="credit">
                {({ checked }) => (
                    <span
                        className={`flex h-9 cursor-pointer items-center justify-center rounded-lg border border-solid text-center text-sm font-medium uppercase tracking-wide transition-all ${
                            checked
                                ? 'border-brand bg-brand text-white shadow-button'
                                : 'border-gray-200 bg-white text-brand dark:border-gray-700 dark:bg-gray-800 dark:text-white'
                        }`}
                    >
            Credit Card
          </span>
                )}
            </RadioGroup.Option>
        </RadioGroup>
    );
}

function LinkAccounts() {

  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Link Accounts
      </h4>
        <AccountsList />
        <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="mx-auto"
        >
            Link
        </Button>
    </div>
  );
}

// Component: PrivateDataset
function PrivateDataset() {

  return (
    <div className="px-6 pt-8">
      <h4 className="mb-4 text-sm font-medium text-gray-900 dark:text-white">
        Private Dataset
      </h4>
      Todo
    </div>
  );
}

export default function PersonalizeDrawer() {
  const { isPersonalizeOpen, closePersonalize } = usePersonalizeDrawer();
  return (
    <Transition appear show={isPersonalizeOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-40 overflow-hidden"
        onClose={closePersonalize}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-0" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="transform transition ease-out duration-300"
          enterFrom="ltr:translate-x-full rtl:-translate-x-full"
          enterTo="translate-x-0"
          leave="transform transition ease-in duration-300"
          leaveFrom="translate-x-0"
          leaveTo="ltr:translate-x-full rtl:-translate-x-full"
        >
          <div className="fixed inset-y-0 w-80 max-w-full bg-white/95 shadow-[0_0_80px_rgba(17,24,39,0.2)] backdrop-blur ltr:right-0 rtl:left-0 dark:bg-dark/90">
            <div className="h-full w-full">
              <div className="flex h-16 items-center justify-between gap-6 border-b border-dashed border-gray-200 px-6 dark:border-gray-700">
                <h3 className="text-base font-medium uppercase text-gray-900 dark:text-white">
                  Personalize
                </h3>
                <Button
                  title="Close"
                  color="white"
                  shape="circle"
                  variant="transparent"
                  size="small"
                  onClick={closePersonalize}
                >
                  <Close className="h-auto w-2.5" />
                </Button>
              </div>

              <Scrollbar style={{ height: 'calc(100% - 64px)' }}>
                <div className="pb-8">
                  <B2CLogin />
                  <LinkAccounts />
                  <SubRedditSelector />
                  <PrivateDataset />
                </div>
              </Scrollbar>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}