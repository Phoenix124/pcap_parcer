import os

from phasortoolbox import PcapParser

my_pcap_parser = PcapParser()
file = open(r'C:\Users\Администратор\PycharmProjects\PhasorToolBox\controller\files\C37.118_1PMU_TCP.pcap')
msgs = my_pcap_parser.from_pcap('C37.118_1PMU_TCP.pcap')

if hasattr(msgs[1].data, 'num_pmu'):
    data = msgs[1]
else:
    data = msgs[2]
data_phasor = msgs[100].data.pmu_data[0].phasors

#

print(str(item for item in msgs[100].data.pmu_data[0].phasors))