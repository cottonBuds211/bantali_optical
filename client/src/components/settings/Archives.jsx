import React from 'react'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageWrapper from '../PageWrapper'
import PatientArchiveTab from '../patients/PatientArchiveTab'

const Archives = () => {
	return (
		<PageWrapper title={'Archives'}>
			<Tabs defaultValue='patient' className='space-y-4'>
				<TabsList className='grid lg:inline-flex w-full grid-cols-2 mb-4  h-9 items-center text-muted-foreground  justify-start rounded-none border-b bg-transparent p-0'>
					<TabsTrigger
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
						value='patient'
					>
						Patients Archive
					</TabsTrigger>
					{/* <TabsTrigger
						className='inline-flex items-center justify-center whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'
						value='appointment'
					>
						Appointments Archive
					</TabsTrigger> */}
				</TabsList>
				<TabsContent value='patient' className='space-y-4'>
					<PatientArchiveTab />
				</TabsContent>
				<TabsContent
					value='appointment'
					className='space-y-4'
				></TabsContent>
			</Tabs>
		</PageWrapper>
	)
}

export default Archives
